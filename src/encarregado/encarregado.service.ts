import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEncarregadoDto } from './dto/create-encarregado.dto';
import { UpdateEncarregadoDto } from './dto/update-encarregado.dto';
import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';
import { prismaPaginate } from 'src/utils/prisma-paginate';
import { Encarregado, Prisma } from '@prisma/client';

@Injectable()
export class EncarregadoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEncarregadoDto) {
    return this.prisma.encarregado.create({ data });
  }

  async findAll(
    params: BaseQueryParams,
  ): Promise<BasePaginatedResponse<Encarregado>> {
    const { search } = params;

    const where: Prisma.EncarregadoWhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    return prismaPaginate(this.prisma.encarregado, params, where, {
      include: {
        controlador: true,
        empresaExterna: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.encarregado.findUnique({
      where: { id },
      include: { controlador: true, empresaExterna: true },
    });
  }

  async update(id: number, data: UpdateEncarregadoDto) {
    return this.prisma.encarregado.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.encarregado.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    });
  }
}
