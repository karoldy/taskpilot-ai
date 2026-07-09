import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './models/position.model';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver(() => Position)
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Query(() => [Position], { description: '获取所有职位列表' })
  @UseGuards(JwtAuthGuard)
  async positions() {
    return this.positionsService.findAll();
  }

  @Query(() => Position, { description: '根据 ID 获取单个职位详情' })
  @UseGuards(JwtAuthGuard)
  async position(@Args('id', { type: () => ID }) id: string) {
    return this.positionsService.findById(id);
  }

  @Mutation(() => Position, { description: '创建新职位' })
  @UseGuards(JwtAuthGuard)
  async createPosition(@Args('input') input: CreatePositionInput) {
    return this.positionsService.create(input);
  }

  @Mutation(() => Position, { description: '更新职位信息' })
  @UseGuards(JwtAuthGuard)
  async updatePosition(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePositionInput,
  ) {
    return this.positionsService.update(id, input);
  }

  @Mutation(() => Boolean, { description: '删除职位' })
  @UseGuards(JwtAuthGuard)
  async removePosition(@Args('id', { type: () => ID }) id: string) {
    await this.positionsService.remove(id);
    return true;
  }
}
