import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  COMPLETED = 'completed',
}

export enum ProjectMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus',
  description: '项目业务状态：active(进行中) / archived(已归档) / completed(已完成)',
});
registerEnumType(ProjectMemberRole, {
  name: 'ProjectMemberRole',
  description: '项目成员角色：owner(拥有者) / admin(管理员) / member(成员) / viewer(只读)',
});

@ObjectType()
export class ProjectMember {
  @Field(() => ID, { description: '成员记录唯一标识' })
  id: string;

  @Field({ description: '所属项目 ID' })
  projectId: string;

  @Field({ description: '用户 ID' })
  userId: string;

  @Field(() => ProjectMemberRole, { description: '成员角色' })
  role: string;

  @Field({ description: '加入时间' })
  joinedAt: Date;
}

@ObjectType()
export class Project {
  @Field(() => ID, { description: '项目唯一标识' })
  id: string;

  @Field({ description: '项目名称（英文/默认语言）' })
  name: string;

  @Field({ description: '项目名称（简体中文）' })
  nameSc: string;

  @Field({ description: '项目名称（繁体中文）' })
  nameTc: string;

  @Field({ description: '项目编码，如 EC' })
  projectCode: string;

  @Field({ nullable: true, description: '项目描述' })
  description?: string;

  @Field({ description: '启用状态，true 为启用，false 为停用（软删除）' })
  status: boolean;

  @Field(() => ProjectStatus, { description: '项目业务状态' })
  projectStatus: string;

  @Field({ description: '项目创建者（拥有者）用户 ID' })
  ownerId: string;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;

  @Field(() => [ProjectMember], { nullable: true, description: '项目成员列表' })
  members?: ProjectMember[];
}
