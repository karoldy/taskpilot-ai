import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginatedMetadata {
  @Field(() => Int, { description: '当前页码' })
  page: number;

  @Field(() => Int, { description: '每页条数' })
  pageSize: number;

  @Field(() => Int, { description: '总条数' })
  total: number;

  @Field({ description: '是否有下一页' })
  hasMore: boolean;
}
