import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrupoEconomicoDto } from './dto/create-grupo-economico.dto';
import { UpdateGrupoEconomicoDto } from './dto/update-grupo-economico.dto';
import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';
import { prismaPaginate } from 'src/utils/prisma-paginate';
import { Prisma, GrupoEconomico } from '@prisma/client';

@Injectable()
export class GrupoEconomicoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateGrupoEconomicoDto): Promise<GrupoEconomico> {
    return this.prisma.grupoEconomico.create({ data });
  }

  async findAll(
    params: BaseQueryParams,
  ): Promise<BasePaginatedResponse<GrupoEconomico>> {
    const { search } = params;
    const where: Prisma.GrupoEconomicoWhereInput = {
      active: true,
      ...(search && {
        nome: { contains: search, mode: Prisma.QueryMode.insensitive },
      }),
    };
    return prismaPaginate(this.prisma.grupoEconomico, params, where);
  }

  async findOne(id: number): Promise<GrupoEconomico | null> {
    return this.prisma.grupoEconomico.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: UpdateGrupoEconomicoDto,
  ): Promise<GrupoEconomico> {
    return this.prisma.grupoEconomico.update({ where: { id }, data });
  }

  async remove(id: number): Promise<GrupoEconomico> {
    return this.prisma.grupoEconomico.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    });
  }
}
