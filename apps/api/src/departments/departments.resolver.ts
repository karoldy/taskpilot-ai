import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './models/department.model';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query(() => [Department], { description: '获取所有部门列表（含父子层级）' })
  @UseGuards(JwtAuthGuard)
  async departments() {
    return this.departmentsService.findAll();
  }

  @Query(() => Department, { description: '根据 ID 获取单个部门详情' })
  @UseGuards(JwtAuthGuard)
  async department(@Args('id', { type: () => ID }) id: string) {
    return this.departmentsService.findById(id);
  }

  @Mutation(() => Department, { description: '创建新部门' })
  @UseGuards(JwtAuthGuard)
  async createDepartment(@Args('input') input: CreateDepartmentInput) {
    return this.departmentsService.create(input);
  }

  @Mutation(() => Department, { description: '更新部门信息' })
  @UseGuards(JwtAuthGuard)
  async updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateDepartmentInput,
  ) {
    return this.departmentsService.update(id, input);
  }

  @Mutation(() => Boolean, { description: '删除部门' })
  @UseGuards(JwtAuthGuard)
  async removeDepartment(@Args('id', { type: () => ID }) id: string) {
    await this.departmentsService.remove(id);
    return true;
  }
}
