import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.department.findMany({
      include: {
        parentDepartment: true,
        childDepartments: true,
      },
    });
  }

  async findById(id: string) {
    const dept = await this.prisma.department.findUnique({
      where: { id },
      include: {
        parentDepartment: true,
        childDepartments: true,
      },
    });
    if (!dept) throw new NotFoundException('Department not found');
    return dept;
  }

  async create(input: CreateDepartmentInput) {
    return this.prisma.department.create({
      data: input,
      include: { parentDepartment: true, childDepartments: true },
    });
  }

  async update(id: string, input: UpdateDepartmentInput) {
    await this.findById(id);
    return this.prisma.department.update({
      where: { id },
      data: input,
      include: { parentDepartment: true, childDepartments: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.department.delete({ where: { id } });
  }
}
