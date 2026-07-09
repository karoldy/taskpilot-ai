import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { Sprint } from './models/sprint.model';
import { CreateSprintInput } from './dto/create-sprint.input';
import { UpdateSprintInput } from './dto/update-sprint.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver(() => Sprint)
export class SprintsResolver {
  constructor(private readonly sprintsService: SprintsService) {}

  @Query(() => [Sprint], { description: '获取指定项目的所有 Sprint' })
  @UseGuards(JwtAuthGuard)
  async sprints(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.sprintsService.findByProject(projectId);
  }

  @Query(() => Sprint, { description: '根据 ID 获取单个 Sprint' })
  @UseGuards(JwtAuthGuard)
  async sprint(@Args('id', { type: () => ID }) id: string) {
    return this.sprintsService.findById(id);
  }

  @Mutation(() => Sprint, { description: '创建新 Sprint' })
  @UseGuards(JwtAuthGuard)
  async createSprint(@Args('input') input: CreateSprintInput) {
    return this.sprintsService.create(input);
  }

  @Mutation(() => Sprint, { description: '更新 Sprint 信息' })
  @UseGuards(JwtAuthGuard)
  async updateSprint(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSprintInput,
  ) {
    return this.sprintsService.update(id, input);
  }

  @Mutation(() => Boolean, { description: '删除 Sprint' })
  @UseGuards(JwtAuthGuard)
  async removeSprint(@Args('id', { type: () => ID }) id: string) {
    await this.sprintsService.remove(id);
    return true;
  }
}
