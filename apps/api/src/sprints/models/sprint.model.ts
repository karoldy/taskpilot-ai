import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum SprintStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

registerEnumType(SprintStatus, {
  name: 'SprintStatus',
  description: 'Sprint 状态：planning(规划中) / active(进行中) / completed(已完成)',
});

@ObjectType()
export class Sprint {
  @Field(() => ID, { description: 'Sprint 唯一标识' })
  id: string;

  @Field({ description: '所属项目 ID' })
  projectId: string;

  @Field({ description: 'Sprint 名称（英文/默认语言）' })
  name: string;

  @Field({ description: 'Sprint 名称（简体中文）' })
  nameSc: string;

  @Field({ description: 'Sprint 名称（繁体中文）' })
  nameTc: string;

  @Field({ nullable: true, description: 'Sprint 目标' })
  goal?: string;

  @Field(() => SprintStatus, { description: 'Sprint 状态' })
  status: string;

  @Field({ description: '开始日期' })
  startDate: Date;

  @Field({ description: '结束日期' })
  endDate: Date;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;
}
