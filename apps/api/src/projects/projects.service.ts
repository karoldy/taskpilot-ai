import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { AddProjectMemberInput } from './dto/add-project-member.input';
import { PaginationArgs, SortOrder } from '../common/pagination/pagination.args';
import { paginate, PaginatedResult } from '@taskpilot/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(pagination?: PaginationArgs): Promise<PaginatedResult<any>> {
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) =>
          this.prisma.project.findMany({
            where: { status: true },
            skip,
            take,
            orderBy,
            include: { members: true },
          }),
        () => this.prisma.project.count({ where: { status: true } }),
        pagination,
      );
    }
    const items = await this.prisma.project.findMany({
      where: { status: true },
      include: { members: true },
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

  async findById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(input: CreateProjectInput, ownerId: string) {
    return this.prisma.project.create({
      data: {
        ...input,
        ownerId,
        members: {
          create: { userId: ownerId, role: 'owner' },
        },
      },
      include: { members: true },
    });
  }

  async update(id: string, input: UpdateProjectInput) {
    await this.findById(id);
    return this.prisma.project.update({
      where: { id },
      data: input,
      include: { members: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.project.update({
      where: { id },
      data: { status: false },
    });
  }

  async addMember(projectId: string, input: AddProjectMemberInput) {
    return this.prisma.projectMember.create({
      data: {
        projectId,
        userId: input.userId,
        role: input.role,
      },
    });
  }

  async removeMember(projectId: string, userId: string) {
    return this.prisma.projectMember.delete({
      where: { projectId_userId: { projectId, userId } },
    });
  }

  async findByMember(userId: string, pagination?: PaginationArgs): Promise<PaginatedResult<any>> {
    const where = { status: true, members: { some: { userId } } };
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) =>
          this.prisma.project.findMany({
            where,
            skip,
            take,
            orderBy,
            include: { members: true },
          }),
        () => this.prisma.project.count({ where }),
        pagination,
      );
    }
    const items = await this.prisma.project.findMany({
      where,
      include: { members: true },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
  }
}
