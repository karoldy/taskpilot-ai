import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => ID, { description: '部门唯一标识' })
  id: string;

  @Field({ description: '部门名称（英文/默认语言）' })
  name: string;

  @Field({ description: '部门名称（简体中文）' })
  nameSc: string;

  @Field({ description: '部门名称（繁体中文）' })
  nameTc: string;

  @Field({ nullable: true, description: '部门描述' })
  description?: string;

  @Field({ nullable: true, description: '上级部门 ID，支持树形结构' })
  parentDepartmentId?: string;

  @Field(() => Department, { nullable: true, description: '上级部门' })
  parentDepartment?: Department;

  @Field(() => [Department], { nullable: true, description: '子部门列表' })
  childDepartments?: Department[];

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;
}
