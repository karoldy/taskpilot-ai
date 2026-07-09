import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string; role: string; jti: string }) {
    // 验证 token 是否在数据库中存在（未被登出/吊销）
    const valid = await this.authService.validateTokenJti(payload.jti);
    if (!valid) {
      throw new UnauthorizedException('Token has been revoked');
    }

    return { id: payload.sub, email: payload.email, role: payload.role, jti: payload.jti };
  }
}
