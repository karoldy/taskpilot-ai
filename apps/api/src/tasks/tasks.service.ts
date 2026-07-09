import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { TaskState } from './models/task.model';
import { PaginationArgs, SortOrder } from '../common/pagination/pagination.args';
import { paginate, PaginatedResult } from '../common/pagination/pagination.helper';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProject(projectId: string, pagination?: PaginationArgs) {
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) =>
          this.prisma.task.findMany({
            where: { projectId, status: true },
            skip,
            take,
            orderBy,
            include: { comments: true, childTasks: true },
          }),
        () => this.prisma.task.count({ where: { projectId, status: true } }),
        pagination,
      );
    }
    const items = await this.prisma.task.findMany({
      where: { projectId, status: true },
      include: { comments: true, childTasks: true },
      orderBy: { createdAt: 'desc' },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        comments: { orderBy: { createdAt: 'asc' } },
        statusLogs: { orderBy: { changedAt: 'desc' } },
        childTasks: true,
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(input: CreateTaskInput, creatorId: string) {
    // 生成 taskCode
    const project = await this.prisma.project.findUnique({ where: { id: input.projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const count = await this.prisma.task.count({ where: { projectId: input.projectId } });
    const taskCode = `${project.projectCode}-${count + 1}`;

    const data: any = { ...input, creatorId, taskCode };
    if (input.dueDate) data.dueDate = new Date(input.dueDate);

    return this.prisma.task.create({
      data,
      include: { comments: true, childTasks: true },
    });
  }

  async update(id: string, input: UpdateTaskInput, userId: string) {
    const task = await this.findById(id);
    const data: any = { ...input };
    if (input.dueDate) data.dueDate = new Date(input.dueDate);

    // 状态变更时自动记录日志
    if (input.taskState && input.taskState !== task.taskState) {
      await this.prisma.taskStatusLog.create({
        data: {
          taskId: id,
          fromState: task.taskState,
          toState: input.taskState,
          changedBy: userId,
        },
      });

      // 根据状态自动填写时间戳
      if (input.taskState === TaskState.IN_PROGRESS && !task.startedAt) {
        data.startedAt = new Date();
      }
      if (input.taskState === TaskState.DONE && !task.completedAt) {
        data.completedAt = new Date();
      }
    }

    return this.prisma.task.update({
      where: { id },
      data,
      include: { comments: true, statusLogs: true, childTasks: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.task.update({
      where: { id },
      data: { status: false },
    });
  }

  async addComment(input: CreateCommentInput, authorId: string) {
    await this.findById(input.taskId);
    return this.prisma.taskComment.create({
      data: {
        taskId: input.taskId,
        authorId,
        content: input.content,
      },
    });
  }

  async removeComment(id: string) {
    const comment = await this.prisma.taskComment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    return this.prisma.taskComment.delete({ where: { id } });
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: SortOrder,
    defaultOrderBy: Record<string, string> = { createdAt: 'desc' },
  ) {
    if (sortBy) {
      return { [sortBy]: sortOrder ?? 'desc' };
    }
    return defaultOrderBy;
  }
}
