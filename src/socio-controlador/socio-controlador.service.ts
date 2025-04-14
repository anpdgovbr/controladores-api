import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSocioControladorDto } from './dto/add-socio-controlador.dto';

@Injectable()
export class SocioControladorService {
  constructor(private readonly prisma: PrismaService) {}

  async listarSocios(controladorId: number) {
    return this.prisma.socioControlador.findMany({
      where: { controladorId },
      include: { socio: true },
    });
  }

  async listarControladores(socioId: number) {
    return this.prisma.socioControlador.findMany({
      where: { socioId },
      include: { controlador: true },
    });
  }

  async adicionarVinculo(controladorId: number, dto: AddSocioControladorDto) {
    return this.prisma.socioControlador.create({
      data: {
        controladorId,
        socioId: dto.socioId,
        percentual: dto.percentual,
      },
    });
  }

  async removerVinculo(controladorId: number, socioId: number) {
    return this.prisma.socioControlador.delete({
      where: {
        socioId_controladorId: {
          socioId,
          controladorId,
        },
      },
    });
  }
}
