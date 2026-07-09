import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(() => ID, { description: '文档唯一标识' })
  id: string;

  @Field({ nullable: true, description: '所属项目 ID' })
  projectId?: string;

  @Field({ description: '文档编码，如 EC-DOC-1' })
  documentCode: string;

  @Field({ description: '文档标题' })
  title: string;

  @Field({ description: '文档内容' })
  content: string;

  @Field({ description: '创建者用户 ID' })
  creatorId: string;

  @Field({ nullable: true, description: '最后修改者用户 ID' })
  updatedBy?: string;

  @Field({ description: '启用状态，true 为启用，false 为停用（软删除）' })
  status: boolean;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;

  @Field(() => [DocumentVersion], { nullable: true, description: '文档版本列表' })
  versions?: DocumentVersion[];
}

@ObjectType()
export class DocumentVersion {
  @Field(() => ID, { description: '版本唯一标识' })
  id: string;

  @Field({ description: '所属文档 ID' })
  documentId: string;

  @Field({ description: '版本号' })
  versionNumber: number;

  @Field({ description: '版本内容快照' })
  content: string;

  @Field({ description: '创建者用户 ID' })
  createdBy: string;

  @Field({ description: '创建时间' })
  createdAt: Date;
}
