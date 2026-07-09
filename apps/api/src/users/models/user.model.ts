import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Department } from '../../departments/models/department.model';
import { Position } from '../../positions/models/position.model';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MEMBER = 'member',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: '用户角色：super_admin(超级管理员) / admin(管理员) / member(普通成员)',
});

@ObjectType()
export class User {
  @Field(() => ID, { description: '用户唯一标识' })
  id: string;

  @Field({ description: '用户邮箱' })
  email: string;

  @Field({ nullable: true, description: '中文姓名' })
  nameZh?: string;

  @Field({ nullable: true, description: '英文姓名' })
  nameEn?: string;

  @Field({ description: '用户显示名称' })
  displayName: string;

  // 内部使用，不暴露到 GraphQL
  departmentId?: string;
  positionId?: string;

  @Field(() => Department, { nullable: true, description: '所属部门' })
  department?: Department;

  @Field(() => Position, { nullable: true, description: '所属职位' })
  position?: Position;

  @Field(() => UserRole, { description: '用户角色' })
  role: string;

  @Field({ nullable: true, description: '头像 URL' })
  avatarUrl?: string;

  @Field({ description: '启用状态，true 为启用，false 为停用（软删除）' })
  status: boolean;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;
}
