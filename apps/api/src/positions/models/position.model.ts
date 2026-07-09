import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Position {
  @Field(() => ID, { description: '职位唯一标识' })
  id: string;

  @Field({ description: '职位名称（英文/默认语言）' })
  name: string;

  @Field({ description: '职位名称（简体中文）' })
  nameSc: string;

  @Field({ description: '职位名称（繁体中文）' })
  nameTc: string;

  @Field({ nullable: true, description: '职位描述' })
  description?: string;

  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '最后更新时间' })
  updatedAt: Date;
}
