import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid email or password');

    if (!user.status) throw new UnauthorizedException('Account is disabled');

    return user;
  }

  /** 签发 accessToken + refreshToken 并持久化 */
  private async issueTokens(user: { id: string; email: string; role: string }) {
    const jti = crypto.randomUUID();
    const refreshToken = crypto.randomBytes(48).toString('hex');
    const refreshExpiresMs = this.parseExpiresIn(
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    );
    const expiresAt = new Date(Date.now() + refreshExpiresMs);

    const payload = { sub: user.id, email: user.email, role: user.role, jti };
    const accessToken = this.jwtService.sign(payload);

    await this.prisma.userToken.create({
      data: {
        jti,
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    // 清理该用户过期 token
    await this.prisma.userToken.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lt: new Date() },
      },
    });

    return { accessToken, refreshToken, user };
  }

  /** 解析 "15m" / "7d" 格式为毫秒 */
  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)(s|m|h|d)$/);
    if (!match) return 7 * 24 * 3600 * 1000; // 默认 7 天
    const value = parseInt(match[1], 10);
    const unit = match[2];
    const multipliers: Record<string, number> = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return value * (multipliers[unit] ?? 86400000);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return this.issueTokens(user);
  }

  async register(data: { email: string; password: string; displayName: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new UnauthorizedException('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        displayName: data.displayName,
      },
    });

    return this.issueTokens(user);
  }

  /** 验证 access token 的 jti 是否在数据库中存在（未被登出/吊销） */
  async validateTokenJti(jti: string): Promise<boolean> {
    const token = await this.prisma.userToken.findUnique({ where: { jti } });
    return !!token;
  }

  /** 刷新 token：验证 refreshToken → 旋转 accessToken 和 refreshToken */
  async refreshTokens(refreshToken: string) {
    const tokenRecord = await this.prisma.userToken.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new BadRequestException('无效的刷新令牌');
    }

    if (tokenRecord.expiresAt < new Date()) {
      await this.prisma.userToken.delete({ where: { id: tokenRecord.id } });
      throw new BadRequestException('刷新令牌已过期，请重新登录');
    }

    if (!tokenRecord.user.status) {
      throw new UnauthorizedException('Account is disabled');
    }

    // 删除旧 token 记录
    await this.prisma.userToken.delete({ where: { id: tokenRecord.id } });

    // 签发新 token 对（旋转）
    return this.issueTokens(tokenRecord.user);
  }

  /** 登出：从数据库删除当前 access token */
  async logout(jti: string) {
    await this.prisma.userToken.deleteMany({ where: { jti } });
    return true;
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return true;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600 * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpires },
    });

    console.log(`[DEV] Reset token for ${email}: ${resetToken}`);

    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user) {
      throw new BadRequestException('无效的重置令牌');
    }

    if (!user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      throw new BadRequestException('重置令牌已过期');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    // 吊销所有 token，强制重新登录
    await this.prisma.userToken.deleteMany({
      where: { userId: user.id },
    });

    return true;
  }
}
