import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum TaskState {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

registerEnumType(TaskState, {
  name: 'TaskState',
  description: '任务状态：todo / in_progress / in_review / done',
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
  description: '任务优先级：low / medium / high / urgent',
});

@ObjectType()
export class Task {
  @Field(() => ID, { description: '任务唯一标识' })
  id: string;

  @Field({ description: '所属项目 ID' })
  projectId: string;

  @Field({ nullable: true, description: '所属 Sprint ID' })
  sprintId?: string;

  @Field({ nullable: true, description: '父任务 ID（支持子任务）' })
  parentTaskId?: string;

  @Field({ description: '任务编码，如 EC-1' })
  taskCode: string;

  @Field({ description: '任务标题' })
  title: string;

  @Field({ nullable: true, description: '任务描述' })
  description?: string;

  @Field({ description: '启用状态，true 为启用，false 为停用（软删除）' })
  status: boolean;

  @Field(() => TaskState, { description: '任务业务状态' })
  taskState: string;

  @Field(() => TaskPriority, { description: '任务优先级' })
  priority: string;

  @Field({ description: '创建者用户 ID' })
  creatorId: string;

  @Field({ nullable: true, description: '负责人用户 ID' })
  assigneeId?: string;

  @Field({ nullable: true, description: '截止日期' })
  dueDate?: Date;

  @Field({ nullable: true, description: '开始时间' })
  startedAt?: Date;

  @Field({ nullable: true, description: '完成时间' })
  completedAt?: Date;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;

  @Field(() => [Task], { nullable: true, description: '子任务列表' })
  childTasks?: Task[];

  @Field(() => [TaskComment], { nullable: true, description: '任务评论列表' })
  comments?: TaskComment[];

  @Field(() => [TaskStatusLog], { nullable: true, description: '状态变更日志' })
  statusLogs?: TaskStatusLog[];
}

@ObjectType()
export class TaskComment {
  @Field(() => ID, { description: '评论唯一标识' })
  id: string;

  @Field({ description: '所属任务 ID' })
  taskId: string;

  @Field({ description: '评论者用户 ID' })
  authorId: string;

  @Field({ description: '评论内容' })
  content: string;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;
}

@ObjectType()
export class TaskStatusLog {
  @Field(() => ID, { description: '日志唯一标识' })
  id: string;

  @Field({ description: '所属任务 ID' })
  taskId: string;

  @Field({ nullable: true, description: '变更前状态' })
  fromState?: string;

  @Field({ description: '变更后状态' })
  toState: string;

  @Field({ description: '变更人用户 ID' })
  changedBy: string;

  @Field({ description: '变更时间' })
  changedAt: Date;
}
