import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from './document.model';
import { PaginatedMetadata } from '../../common/pagination/paginated-response.model';

@ObjectType()
export class PaginatedDocuments {
  @Field(() => [Document], { description: '文档列表' })
  items: Document[];

  @Field(() => PaginatedMetadata, { description: '分页元数据' })
  meta: PaginatedMetadata;
}
