import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsDateString, IsEnum } from 'class-validator';
import { SprintStatus } from '../models/sprint.model';

@InputType()
export class UpdateSprintInput {
  @Field({ nullable: true, description: 'Sprint 名称（英文/默认语言）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @Field({ nullable: true, description: 'Sprint 名称（简体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameSc?: string;

  @Field({ nullable: true, description: 'Sprint 名称（繁体中文）' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nameTc?: string;

  @Field({ nullable: true, description: 'Sprint 目标' })
  @IsOptional()
  @IsString()
  goal?: string;

  @Field(() => SprintStatus, { nullable: true, description: 'Sprint 状态' })
  @IsOptional()
  @IsEnum(SprintStatus)
  status?: SprintStatus;

  @Field({ nullable: true, description: '开始日期' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true, description: '结束日期' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
