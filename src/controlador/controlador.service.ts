import { BadRequestException, Injectable } from "@nestjs/common"

import { CreateControladorDto } from "./dto/create-controlador.dto"
import { UpdateControladorDto } from "./dto/update-controlador.dto"
import { PrismaService } from "src/prisma/prisma.service"
import { BasePaginatedResponse, BaseQueryParams } from "src/types/base-query"
import { Controlador, Prisma } from "@prisma/client"
import { prismaPaginate } from "src/utils/prisma-paginate"

@Injectable()
export class ControladorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateControladorDto) {
    const { cnpj, cpf } = data

    if (!cnpj && !cpf) {
      throw new BadRequestException("É necessário informar CNPJ ou CPF.")
    }

    const orConditions: Prisma.ControladorWhereInput[] = []

    if (cnpj) {
      orConditions.push({ cnpj })
    }

    if (cpf) {
      orConditions.push({ cpf })
    }

    const existing = await this.prisma.controlador.findFirst({
      where: {
        OR: orConditions,
      },
    })

    if (existing) {
      if (!existing.active) {
        throw new BadRequestException(
          "Já existe um controlador com este CNPJ/CPF, mas está desativado. Considere restaurá-lo."
        )
      } else {
        throw new BadRequestException(
          "Já existe um controlador ativo com este CNPJ/CPF."
        )
      }
    }

    return this.prisma.controlador.create({ data })
  }

  async findAll(
    params: BaseQueryParams
  ): Promise<BasePaginatedResponse<Controlador>> {
    const { search } = params

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
    }

    return prismaPaginate(this.prisma.controlador, params, where, {
      include: {
        setor: true,
        cnae: true,
        grupoEconomico: true,
      },
    })
  }

  async findOne(id: number, incluirInativo = false) {
    return this.prisma.controlador.findFirst({
      where: { id, ...(incluirInativo ? {} : { active: true }) },
      include: { setor: true, cnae: true, grupoEconomico: true },
    })
  }

  async update(id: number, data: UpdateControladorDto) {
    return this.prisma.controlador.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.controlador.update({
      where: { id },
      data: {
        active: false,
        exclusionDate: new Date(),
      },
    })
  }
}
