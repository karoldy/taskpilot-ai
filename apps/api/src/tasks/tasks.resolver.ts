import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskComment, TaskStatusLog } from './models/task.model';
import { PaginatedTasks } from './models/paginated-tasks.model';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => PaginatedTasks, { description: '获取指定项目的任务列表（支持分页和排序）' })
  @UseGuards(JwtAuthGuard)
  async tasks(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args() pagination: PaginationArgs,
  ) {
    return this.tasksService.findByProject(projectId, pagination);
  }

  @Query(() => Task, { description: '根据 ID 获取单个任务详情' })
  @UseGuards(JwtAuthGuard)
  async task(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.findById(id);
  }

  @Mutation(() => Task, { description: '创建新任务' })
  @UseGuards(JwtAuthGuard)
  async createTask(@Args('input') input: CreateTaskInput, @CurrentUser() user: { id: string }) {
    return this.tasksService.create(input, user.id);
  }

  @Mutation(() => Task, { description: '更新任务信息' })
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTaskInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.tasksService.update(id, input, user.id);
  }

  @Mutation(() => Task, { description: '停用任务（软删除）' })
  @UseGuards(JwtAuthGuard)
  async removeTask(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.remove(id);
  }

  @Mutation(() => TaskComment, { description: '为任务添加评论' })
  @UseGuards(JwtAuthGuard)
  async addTaskComment(
    @Args('input') input: CreateCommentInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.tasksService.addComment(input, user.id);
  }

  @Mutation(() => Boolean, { description: '删除任务评论' })
  @UseGuards(JwtAuthGuard)
  async removeTaskComment(@Args('id', { type: () => ID }) id: string) {
    await this.tasksService.removeComment(id);
    return true;
  }
}
