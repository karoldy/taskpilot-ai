import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateSprintInput } from './dto/create-sprint.input';
import { UpdateSprintInput } from './dto/update-sprint.input';

@Injectable()
export class SprintsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProject(projectId: string) {
    return this.prisma.sprint.findMany({
      where: { projectId },
      orderBy: { startDate: 'desc' },
    });
  }

  async findById(id: string) {
    const sprint = await this.prisma.sprint.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!sprint) throw new NotFoundException('Sprint not found');
    return sprint;
  }

  async create(input: CreateSprintInput) {
    return this.prisma.sprint.create({
      data: {
        ...input,
        startDate: new Date(input.startDate),
        endDate: new Date(input.endDate),
      },
    });
  }

  async update(id: string, input: UpdateSprintInput) {
    await this.findById(id);
    const data: any = { ...input };
    if (input.startDate) data.startDate = new Date(input.startDate);
    if (input.endDate) data.endDate = new Date(input.endDate);
    return this.prisma.sprint.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.sprint.delete({ where: { id } });
  }
}
