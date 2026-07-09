import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field({ description: '邮箱收到的重置令牌' })
  @IsString()
  token: string;

  @Field({ description: '新密码，最少 6 位' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
