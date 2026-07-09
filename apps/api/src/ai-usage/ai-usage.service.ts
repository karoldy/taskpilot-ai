import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { PaginationArgs, SortOrder } from '../common/pagination/pagination.args';
import { paginate, PaginatedResult } from '../common/pagination/pagination.helper';

@Injectable()
export class AiUsageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationArgs): Promise<PaginatedResult<any>> {
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) => this.prisma.aiUsageRecord.findMany({ skip, take, orderBy }),
        () => this.prisma.aiUsageRecord.count(),
        pagination,
      );
    }
    const items = await this.prisma.aiUsageRecord.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
  }

  async findByUser(userId: string, pagination?: PaginationArgs): Promise<PaginatedResult<any>> {
    const where = { userId };
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) => this.prisma.aiUsageRecord.findMany({ where, skip, take, orderBy }),
        () => this.prisma.aiUsageRecord.count({ where }),
        pagination,
      );
    }
    const items = await this.prisma.aiUsageRecord.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
  }

  async findByProject(
    projectId: string,
    pagination?: PaginationArgs,
  ): Promise<PaginatedResult<any>> {
    const where = { projectId };
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) => this.prisma.aiUsageRecord.findMany({ where, skip, take, orderBy }),
        () => this.prisma.aiUsageRecord.count({ where }),
        pagination,
      );
    }
    const items = await this.prisma.aiUsageRecord.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
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
