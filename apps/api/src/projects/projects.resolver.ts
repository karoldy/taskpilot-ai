import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, ProjectMember } from './models/project.model';
import { PaginatedProjects } from './models/paginated-projects.model';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { AddProjectMemberInput } from './dto/add-project-member.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => PaginatedProjects, { description: '获取所有项目列表（支持分页）' })
  @UseGuards(JwtAuthGuard)
  async projects(@Args() pagination: PaginationArgs) {
    return this.projectsService.findAll(pagination);
  }

  @Query(() => Project, { description: '根据 ID 获取单个项目详情' })
  @UseGuards(JwtAuthGuard)
  async project(@Args('id', { type: () => ID }) id: string) {
    return this.projectsService.findById(id);
  }

  @Query(() => PaginatedProjects, { description: '获取当前登录用户参与的项目列表（支持分页）' })
  @UseGuards(JwtAuthGuard)
  async myProjects(@CurrentUser() user: { id: string }, @Args() pagination: PaginationArgs) {
    return this.projectsService.findByMember(user.id, pagination);
  }

  @Mutation(() => Project, { description: '创建新项目，创建者自动成为项目拥有者' })
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Args('input') input: CreateProjectInput,
    @CurrentUser() user: { id: string },
  ) {
    return this.projectsService.create(input, user.id);
  }

  @Mutation(() => Project, { description: '更新项目信息' })
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProjectInput,
  ) {
    return this.projectsService.update(id, input);
  }

  @Mutation(() => Project, { description: '停用项目（软删除）' })
  @UseGuards(JwtAuthGuard)
  async removeProject(@Args('id', { type: () => ID }) id: string) {
    return this.projectsService.remove(id);
  }

  @Mutation(() => ProjectMember, { description: '向项目添加成员' })
  @UseGuards(JwtAuthGuard)
  async addProjectMember(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args('input') input: AddProjectMemberInput,
  ) {
    return this.projectsService.addMember(projectId, input);
  }

  @Mutation(() => ProjectMember, { description: '从项目中移除成员' })
  @UseGuards(JwtAuthGuard)
  async removeProjectMember(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args('userId', { type: () => ID }) userId: string,
  ) {
    return this.projectsService.removeMember(projectId, userId);
  }
}
