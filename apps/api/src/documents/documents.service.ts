import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { PaginationArgs, SortOrder } from '../common/pagination/pagination.args';
import { paginate, PaginatedResult } from '@taskpilot/common';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProject(projectId: string, pagination?: PaginationArgs) {
    const where = { projectId, status: true };
    if (pagination) {
      const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);
      return paginate(
        (skip, take) => this.prisma.document.findMany({ where, skip, take, orderBy }),
        () => this.prisma.document.count({ where }),
        pagination,
      );
    }
    const items = await this.prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return {
      items,
      meta: { page: 1, pageSize: items.length, total: items.length, hasMore: false },
    };
  }

  async findById(id: string) {
    const doc = await this.prisma.document.findUnique({
      where: { id },
      include: { versions: { orderBy: { versionNumber: 'desc' } } },
    });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async create(input: CreateDocumentInput, creatorId: string) {
    // 生成 documentCode
    let projectCode = 'GLOBAL';
    if (input.projectId) {
      const project = await this.prisma.project.findUnique({
        where: { id: input.projectId },
      });
      if (project) projectCode = project.projectCode;
    }

    const count = await this.prisma.document.count({
      where: input.projectId ? { projectId: input.projectId } : {},
    });
    const documentCode = `${projectCode}-DOC-${count + 1}`;

    return this.prisma.document.create({
      data: {
        ...input,
        documentCode,
        creatorId,
        versions: {
          create: {
            versionNumber: 1,
            content: input.content ?? '',
            createdBy: creatorId,
          },
        },
      },
      include: { versions: true },
    });
  }

  async update(id: string, input: UpdateDocumentInput, userId: string) {
    const doc = await this.findById(id);

    // 如果内容变更，创建新版本
    if (input.content !== undefined && input.content !== doc.content) {
      const latestVersion = doc.versions[0];
      const newVersionNumber = (latestVersion?.versionNumber ?? 0) + 1;

      await this.prisma.documentVersion.create({
        data: {
          documentId: id,
          versionNumber: newVersionNumber,
          content: input.content,
          createdBy: userId,
        },
      });
    }

    return this.prisma.document.update({
      where: { id },
      data: { ...input, updatedBy: userId },
      include: { versions: { orderBy: { versionNumber: 'desc' } } },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.document.update({
      where: { id },
      data: { status: false },
    });
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
