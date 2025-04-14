import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseQueryParams, BasePaginatedResponse } from 'src/types/base-query';
import { Prisma } from '@prisma/client';
import { prismaPaginate } from 'src/utils/prisma-paginate';

@Injectable()
export class CnaeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: BaseQueryParams): Promise<BasePaginatedResponse<any>> {
    const { search } = params;

    const where: Prisma.CNAEWhereInput = {
      active: true,
      ...(search && {
        OR: [
          { nome: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { code: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    return prismaPaginate(this.prisma.cNAE, params, where);
  }

  async findOne(id: number) {
    return this.prisma.cNAE.findUnique({
      where: { id },
    });
  }
}
