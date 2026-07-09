import { ObjectType, Field } from '@nestjs/graphql';
import { AiUsageRecord } from './ai-usage-record.model';
import { PaginatedMetadata } from '../../common/pagination/paginated-response.model';

@ObjectType()
export class PaginatedAiUsage {
  @Field(() => [AiUsageRecord], { description: 'AI 用量记录列表' })
  items: AiUsageRecord[];

  @Field(() => PaginatedMetadata, { description: '分页元数据' })
  meta: PaginatedMetadata;
}
