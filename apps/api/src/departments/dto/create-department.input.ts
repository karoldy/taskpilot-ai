import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field({ description: '部门名称（英文/默认语言）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @Field({ description: '部门名称（简体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nameSc: string;

  @Field({ description: '部门名称（繁体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nameTc: string;

  @Field({ nullable: true, description: '部门描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true, description: '上级部门 ID' })
  @IsOptional()
  @IsString()
  parentDepartmentId?: string;
}
