import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field({ description: '刷新令牌' })
  @IsString()
  refreshToken: string;
}
