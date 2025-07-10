import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';
import { Prisma, Socio } from '@prisma/client';
import { prismaPaginate } from 'src/utils/prisma-paginate';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';

@Injectable()
export class SocioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSocioDto): Promise<Socio> {
    return this.prisma.socio.create({ data });
  }

  async findAll(
    params: BaseQueryParams,
  ): Promise<BasePaginatedResponse<Socio>> {
    const { search } = params;

    const where: Prisma.SocioWhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { cpfCnpj: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    return prismaPaginate(this.prisma.socio, params, where);
  }

  async findOne(id: number): Promise<Socio | null> {
    return this.prisma.socio.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateSocioDto): Promise<Socio> {
    return this.prisma.socio.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Socio> {
    return this.prisma.socio.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    });
  }
}
