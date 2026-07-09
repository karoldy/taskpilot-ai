import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { AuthPayload } from './dto/auth-payload.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, {
    description: '用户登录，返回 accessToken、refreshToken 及用户信息',
  })
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input.email, input.password);
  }

  @Mutation(() => AuthPayload, {
    description: '用户注册，返回 accessToken、refreshToken 及用户信息',
  })
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthPayload, {
    description: '刷新令牌：使用 refreshToken 获取新的 accessToken 和 refreshToken',
  })
  async refreshToken(@Args('input') input: RefreshTokenInput) {
    return this.authService.refreshTokens(input.refreshToken);
  }

  @Mutation(() => Boolean, { description: '忘记密码：发送重置令牌到注册邮箱' })
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return this.authService.forgotPassword(input.email);
  }

  @Mutation(() => Boolean, {
    description: '重置密码：使用令牌设置新密码，成功后吊销所有已签发 token',
  })
  async resetPassword(@Args('input') input: ResetPasswordInput) {
    return this.authService.resetPassword(input.token, input.newPassword);
  }

  @Mutation(() => Boolean, { description: '登出：吊销当前 token' })
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: { jti: string }) {
    return this.authService.logout(user.jti);
  }
}
