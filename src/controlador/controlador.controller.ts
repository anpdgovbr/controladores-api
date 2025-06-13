import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { CreateControladorDto } from './dto/create-controlador.dto';
import { UpdateControladorDto } from './dto/update-controlador.dto';
import { BaseQueryParams } from 'src/types/base-query';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Controladores')
@Controller('controladores')
export class ControladorController {
  constructor(private readonly service: ControladorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo controlador de dados' })
  @ApiResponse({ status: 201, description: 'Controlador criado com sucesso' })
  create(@Body() dto: CreateControladorDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar controladores ativos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'Empresa Exemplo' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'nome' })
  @ApiQuery({ name: 'ascending', required: false, example: true })
  @ApiResponse({ status: 200, description: 'Lista paginada de controladores' })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar controlador ativo por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do controlador',
  })
  @ApiResponse({
    status: 200,
    description: 'Controlador encontrado com sucesso',
    schema: {
      example: {
        id: 1,
        nome: 'Controlador Exemplo',
        cnpj: '12345678000100',
        setor: { id: 2, nome: 'Financeiro' },
        cnae: { id: 5, code: '6201-5/01', nome: 'Desenvolvimento de software' },
        grupoEconomico: { id: 1, nome: 'Grupo XPTO' },
        active: true,
        exclusionDate: null,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Controlador não encontrado ou está desativado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do controlador' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Controlador atualizado com sucesso',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateControladorDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover (soft delete) controlador' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Controlador removido com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
