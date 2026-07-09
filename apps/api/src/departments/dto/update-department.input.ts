import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true, description: '部门名称（英文/默认语言）' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @Field({ nullable: true, description: '部门名称（简体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameSc?: string;

  @Field({ nullable: true, description: '部门名称（繁体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameTc?: string;

  @Field({ nullable: true, description: '部门描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true, description: '上级部门 ID' })
  @IsOptional()
  @IsString()
  parentDepartmentId?: string;
}
