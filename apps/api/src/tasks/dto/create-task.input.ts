import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength, MaxLength, IsEnum, IsDateString } from 'class-validator';
import { TaskState, TaskPriority } from '../models/task.model';

@InputType()
export class CreateTaskInput {
  @Field({ description: '所属项目 ID' })
  @IsString()
  projectId: string;

  @Field({ nullable: true, description: '所属 Sprint ID' })
  @IsOptional()
  @IsString()
  sprintId?: string;

  @Field({ nullable: true, description: '父任务 ID' })
  @IsOptional()
  @IsString()
  parentTaskId?: string;

  @Field({ description: '任务标题' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title: string;

  @Field({ nullable: true, description: '任务描述' })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => TaskState, { defaultValue: TaskState.TODO, description: '任务业务状态' })
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @Field(() => TaskPriority, { defaultValue: TaskPriority.MEDIUM, description: '任务优先级' })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @Field({ nullable: true, description: '负责人用户 ID' })
  @IsOptional()
  @IsString()
  assigneeId?: string;

  @Field({ nullable: true, description: '截止日期' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
