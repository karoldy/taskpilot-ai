import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field({ description: '项目名称（英文/默认语言）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @Field({ description: '项目名称（简体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  nameSc: string;

  @Field({ description: '项目名称（繁体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  nameTc: string;

  @Field({ description: '项目编码，如 EC 表示电商项目，最长 20 字符' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  projectCode: string;

  @Field({ nullable: true, description: '项目描述' })
  @IsOptional()
  @IsString()
  description?: string;
}
