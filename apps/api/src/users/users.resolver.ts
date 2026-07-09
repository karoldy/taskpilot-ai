import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { DepartmentsService } from '../departments/departments.service';
import { PositionsService } from '../positions/positions.service';
import { User } from './models/user.model';
import { PaginatedUsers } from './models/paginated-users.model';
import { Department } from '../departments/models/department.model';
import { Position } from '../positions/models/position.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService,
  ) {}

  @Query(() => PaginatedUsers, { description: '获取用户列表（支持分页）' })
  @UseGuards(JwtAuthGuard)
  async users(@Args() pagination: PaginationArgs) {
    return this.usersService.findAll(pagination);
  }

  @Query(() => User, { description: '根据 ID 获取单个用户' })
  @UseGuards(JwtAuthGuard)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findById(id);
  }

  @Query(() => User, { description: '获取当前登录用户信息' })
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() currentUser: { id: string }) {
    return this.usersService.findById(currentUser.id);
  }

  @Mutation(() => User, { description: '创建新用户（管理员操作）' })
  @UseGuards(JwtAuthGuard)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.usersService.create(input);
  }

  @Mutation(() => User, { description: '更新用户信息' })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.usersService.update(id, input);
  }

  @Mutation(() => User, { description: '停用用户（软删除）' })
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => Department, { nullable: true, description: '所属部门' })
  async department(@Parent() user: User) {
    if (!user.departmentId) return null;
    return this.departmentsService.findById(user.departmentId);
  }

  @ResolveField(() => Position, { nullable: true, description: '所属职位' })
  async position(@Parent() user: User) {
    if (!user.positionId) return null;
    return this.positionsService.findById(user.positionId);
  }
}
