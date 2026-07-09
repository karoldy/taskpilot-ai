import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreatePositionInput } from './dto/create-position.input';
import { UpdatePositionInput } from './dto/update-position.input';

@Injectable()
export class PositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.position.findMany();
  }

  async findById(id: string) {
    const position = await this.prisma.position.findUnique({ where: { id } });
    if (!position) throw new NotFoundException('Position not found');
    return position;
  }

  async create(input: CreatePositionInput) {
    return this.prisma.position.create({ data: input });
  }

  async update(id: string, input: UpdatePositionInput) {
    await this.findById(id);
    return this.prisma.position.update({ where: { id }, data: input });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.position.delete({ where: { id } });
  }
}
