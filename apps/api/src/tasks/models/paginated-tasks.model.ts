import { ObjectType, Field } from '@nestjs/graphql';
import { Task } from './task.model';
import { PaginatedMetadata } from '../../common/pagination/paginated-response.model';

@ObjectType()
export class PaginatedTasks {
  @Field(() => [Task], { description: '任务列表' })
  items: Task[];

  @Field(() => PaginatedMetadata, { description: '分页元数据' })
  meta: PaginatedMetadata;
}
