import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Min, Max, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: '排序方向：asc(升序) / desc(降序)',
});

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 1, description: '页码，从 1 开始' })
  @Min(1)
  page: number = 1;

  @Field(() => Int, { defaultValue: 20, description: '每页条数，1-100' })
  @Min(1)
  @Max(100)
  pageSize: number = 20;

  @Field({ nullable: true, description: '排序字段，如 createdAt、email、name 等' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @Field(() => SortOrder, { nullable: true, description: '排序方向' })
  @IsOptional()
  sortOrder?: SortOrder;
}
