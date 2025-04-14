import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';
import { CreateSetorDto } from './dto/create-setor.dto';
import { UpdateSetorDto } from './dto/update-setor.dto';
import { prismaPaginate } from 'src/utils/prisma-paginate';
import { Prisma } from '@prisma/client';

@Injectable()
export class SetorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSetorDto) {
    return this.prisma.setor.create({ data });
  }

  async findAll(params: BaseQueryParams): Promise<BasePaginatedResponse<any>> {
    const { search } = params;

    const where: Prisma.SetorWhereInput = {
      active: true,
      ...(search && {
        nome: { contains: search, mode: Prisma.QueryMode.insensitive },
      }),
    };

    return prismaPaginate(this.prisma.setor, params, where);
  }

  async findOne(id: number) {
    return this.prisma.setor.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateSetorDto) {
    return this.prisma.setor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.setor.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    });
  }
}
