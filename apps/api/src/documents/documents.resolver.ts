import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Document } from './models/document.model';
import { PaginatedDocuments } from './models/paginated-documents.model';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-document.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Query(() => PaginatedDocuments, { description: '获取指定项目的文档列表（支持分页和排序）' })
  @UseGuards(JwtAuthGuard)
  async documents(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args() pagination: PaginationArgs,
  ) {
    return this.documentsService.findByProject(projectId, pagination);
  }

  @Query(() => Document, { description: '根据 ID 获取单个文档详情（含版本历史）' })
  @UseGuards(JwtAuthGuard)
  async document(@Args('id', { type: () => ID }) id: string) {
    return this.documentsService.findById(id);
  }

  @Mutation(() => Document, { description: '创建新文档，自动生成 documentCode' })
  @UseGuards(JwtAuthGuard)
  async createDocument(
    @Args('input') input: CreateDocumentInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.documentsService.create(input, user.id);
  }

  @Mutation(() => Document, { description: '更新文档，内容变更时自动创建新版本' })
  @UseGuards(JwtAuthGuard)
  async updateDocument(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDocumentInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.documentsService.update(id, input, user.id);
  }

  @Mutation(() => Document, { description: '停用文档（软删除）' })
  @UseGuards(JwtAuthGuard)
  async removeDocument(@Args('id', { type: () => ID }) id: string) {
    return this.documentsService.remove(id);
  }
}
