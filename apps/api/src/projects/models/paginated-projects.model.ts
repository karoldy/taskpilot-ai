import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from './project.model';
import { PaginatedMetadata } from '../../common/pagination/paginated-response.model';

@ObjectType()
export class PaginatedProjects {
  @Field(() => [Project], { description: '项目列表' })
  items: Project[];

  @Field(() => PaginatedMetadata, { description: '分页元数据' })
  meta: PaginatedMetadata;
}
