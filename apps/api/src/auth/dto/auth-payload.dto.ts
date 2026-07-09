import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class AuthPayload {
  @Field({ description: 'JWT 访问令牌（有效期 15 分钟）' })
  accessToken: string;

  @Field({ description: '刷新令牌（有效期 7 天）' })
  refreshToken: string;

  @Field(() => User, { description: '当前登录用户信息' })
  user: User;
}
