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
import { SocioService } from './socio.service';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { BaseQueryParams } from 'src/types/base-query';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Sócios')
@Controller('socios')
export class SocioController {
  constructor(private readonly service: SocioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo sócio' })
  @ApiResponse({ status: 201, description: 'Sócio criado com sucesso' })
  create(@Body() dto: CreateSocioDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar sócios ativos' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Lista paginada' })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sócio por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Sócio não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do sócio' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSocioDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover (soft delete) sócio' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
