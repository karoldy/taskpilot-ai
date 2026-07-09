import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreatePositionInput {
  @Field({ description: '职位名称（英文/默认语言）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @Field({ description: '职位名称（简体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nameSc: string;

  @Field({ description: '职位名称（繁体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nameTc: string;

  @Field({ nullable: true, description: '职位描述' })
  @IsOptional()
  @IsString()
  description?: string;
}
