import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field({ description: '用户邮箱' })
  @IsEmail()
  email: string;

  @Field({ description: '用户密码，6-100 位' })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @Field({ description: '用户显示名称，1-100 字符' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  displayName: string;
}
