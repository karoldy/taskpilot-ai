import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs, SortOrder } from '../common/pagination/pagination.args';
import { paginate, PaginatedResult } from '@taskpilot/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationArgs): Promise<PaginatedResult<any>> {
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder, {
        createdAt: 'desc',
      });
      return paginate(
        (skip, take) =>
          this.prisma.user.findMany({
            where: { status: true },
            skip,
            take,
            orderBy,
          }),
        () => this.prisma.user.count({ where: { status: true } }),
        pagination,
      );
    }
    const items = await this.prisma.user.findMany({ where: { status: true } });
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

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(input: CreateUserInput) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    const { password, ...rest } = input;
    return this.prisma.user.create({
      data: { ...rest, passwordHash },
    });
  }

  async update(id: string, input: UpdateUserInput) {
    await this.findById(id);
    return this.prisma.user.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data: { status: false },
    });
  }
}
