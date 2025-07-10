import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SocioControladorService } from './socio-controlador.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AddSocioControladorDto } from './dto/add-socio-controlador.dto';

@ApiTags('Relação Sócio-Controlador')
@Controller()
export class SocioControladorController {
  constructor(private readonly service: SocioControladorService) {}

  @Get('controladores/:id/socios')
  @ApiOperation({ summary: 'Listar sócios vinculados a um controlador' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de sócios vinculados ao controlador',
  })
  listarSocios(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarSocios(id);
  }

  @Get('socios/:id/controladores')
  @ApiOperation({ summary: 'Listar controladores vinculados a um sócio' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de controladores em que o sócio participa',
  })
  listarControladores(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarControladores(id);
  }

  @Post('controladores/:id/socios')
  @ApiOperation({ summary: 'Vincular sócio a um controlador' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 201,
    description: 'Vínculo criado entre sócio e controlador',
  })
  adicionarVinculo(
    @Param('id', ParseIntPipe) controladorId: number,
    @Body() dto: AddSocioControladorDto,
  ) {
    return this.service.adicionarVinculo(controladorId, dto);
  }

  @Delete('controladores/:controladorId/socios/:socioId')
  @ApiOperation({ summary: 'Remover vínculo de sócio com controlador' })
  @ApiParam({ name: 'controladorId', example: 1 })
  @ApiParam({ name: 'socioId', example: 2 })
  @ApiResponse({
    status: 200,
    description: 'Vínculo removido com sucesso',
  })
  removerVinculo(
    @Param('controladorId', ParseIntPipe) controladorId: number,
    @Param('socioId', ParseIntPipe) socioId: number,
  ) {
    return this.service.removerVinculo(controladorId, socioId);
  }
}
