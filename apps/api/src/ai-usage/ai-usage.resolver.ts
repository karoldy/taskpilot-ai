import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AiUsageService } from './ai-usage.service';
import { AiUsageRecord } from './models/ai-usage-record.model';
import { PaginatedAiUsage } from './models/paginated-ai-usage.model';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => AiUsageRecord)
export class AiUsageResolver {
  constructor(private readonly aiUsageService: AiUsageService) {}

  @Query(() => PaginatedAiUsage, { description: '获取所有 AI 用量记录（支持分页）' })
  @UseGuards(JwtAuthGuard)
  async aiUsageRecords(@Args() pagination: PaginationArgs) {
    return this.aiUsageService.findAll(pagination);
  }

  @Query(() => PaginatedAiUsage, { description: '获取当前用户的 AI 用量记录' })
  @UseGuards(JwtAuthGuard)
  async myAiUsage(@CurrentUser() user: { id: string }, @Args() pagination: PaginationArgs) {
    return this.aiUsageService.findByUser(user.id, pagination);
  }

  @Query(() => PaginatedAiUsage, { description: '获取指定项目的 AI 用量记录' })
  @UseGuards(JwtAuthGuard)
  async projectAiUsage(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args() pagination: PaginationArgs,
  ) {
    return this.aiUsageService.findByProject(projectId, pagination);
  }
}
