import { Injectable } from '@nestjs/common';

import { CreateControladorDto } from './dto/create-controlador.dto';
import { UpdateControladorDto } from './dto/update-controlador.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePaginatedResponse, BaseQueryParams } from 'src/types/base-query';
import { Controlador, Prisma } from '@prisma/client';
import { prismaPaginate } from 'src/utils/prisma-paginate';

@Injectable()
export class ControladorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateControladorDto) {
    return this.prisma.controlador.create({ data });
  }

  async findAll(
    params: BaseQueryParams,
  ): Promise<BasePaginatedResponse<Controlador>> {
    const { search } = params;

    const where: Prisma.ControladorWhereInput = {
      active: true,
      ...(search && {
        OR: [
          {
            nome: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            cnpj: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
    };

    return prismaPaginate(this.prisma.controlador, params, where, {
      include: {
        setor: true,
        cnae: true,
        grupoEconomico: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.controlador.findUnique({
      where: { id },
      include: { setor: true, cnae: true, grupoEconomico: true },
    });
  }

  async update(id: number, data: UpdateControladorDto) {
    return this.prisma.controlador.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.controlador.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    });
  }
}
