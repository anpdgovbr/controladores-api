import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseQueryParams } from 'src/types/base-query';
import { CnaeService } from './cnae.service';

@ApiTags('CNAEs')
@Controller('cnaes')
export class CnaeController {
  constructor(private readonly service: CnaeService) {}

  @Get()
  @ApiOperation({ summary: 'Listar CNAEs ativos' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: '62.01-5-01' })
  @ApiQuery({ name: 'orderBy', required: false, example: 'code' })
  @ApiQuery({ name: 'ascending', required: false, example: true })
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de CNAEs ativos',
  })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar CNAE por ID' })
  @ApiParam({ name: 'id', example: 3 })
  @ApiResponse({
    status: 200,
    description: 'CNAE encontrado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'CNAE não encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
}
