import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field({ description: '用户邮箱' })
  @IsEmail()
  email: string;

  @Field({ description: '用户密码，最少 6 位' })
  @IsString()
  @MinLength(6)
  password: string;
}
