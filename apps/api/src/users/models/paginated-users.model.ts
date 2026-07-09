import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';
import { PaginatedMetadata } from '../../common/pagination/paginated-response.model';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User], { description: '用户列表' })
  items: User[];

  @Field(() => PaginatedMetadata, { description: '分页元数据' })
  meta: PaginatedMetadata;
}
