import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsEnum, IsBoolean } from 'class-validator';
import { ProjectStatus } from '../models/project.model';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true, description: '项目名称（英文/默认语言）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @Field({ nullable: true, description: '项目名称（简体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameSc?: string;

  @Field({ nullable: true, description: '项目名称（繁体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameTc?: string;

  @Field({ nullable: true, description: '项目描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => ProjectStatus, {
    nullable: true,
    description: '项目业务状态：active / archived / completed',
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  projectStatus?: ProjectStatus;

  @Field({ nullable: true, description: '启用/停用状态，true 为启用，false 为停用（软删除）' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
