import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength, IsDateString, IsEnum } from 'class-validator';
import { SprintStatus } from '../models/sprint.model';

@InputType()
export class CreateSprintInput {
  @Field({ description: '所属项目 ID' })
  @IsString()
  projectId: string;

  @Field({ description: 'Sprint 名称（英文/默认语言）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @Field({ description: 'Sprint 名称（简体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  nameSc: string;

  @Field({ description: 'Sprint 名称（繁体中文）' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  nameTc: string;

  @Field({ nullable: true, description: 'Sprint 目标' })
  @IsOptional()
  @IsString()
  goal?: string;

  @Field(() => SprintStatus, { defaultValue: SprintStatus.PLANNING, description: 'Sprint 状态' })
  @IsOptional()
  @IsEnum(SprintStatus)
  status?: SprintStatus;

  @Field({ description: '开始日期' })
  @IsDateString()
  startDate: string;

  @Field({ description: '结束日期' })
  @IsDateString()
  endDate: string;
}
