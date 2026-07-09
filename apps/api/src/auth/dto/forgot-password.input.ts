import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field({ description: '注册邮箱' })
  @IsEmail()
  email: string;
}
