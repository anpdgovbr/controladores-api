import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common"
import { SetorService } from "./setor.service"
import { CreateSetorDto } from "./dto/create-setor.dto"
import { UpdateSetorDto } from "./dto/update-setor.dto"
import { BaseQueryParams } from "src/types/base-query"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger"

@ApiTags("Setores")
@Controller("setores")
export class SetorController {
  constructor(private readonly service: SetorService) {}

  @Post()
  @ApiOperation({ summary: "Criar novo setor" })
  @ApiResponse({ status: 201, description: "Setor criado com sucesso" })
  create(@Body() dto: CreateSetorDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Listar setores ativos" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "pageSize", required: false, example: 10 })
  @ApiQuery({ name: "search", required: false, example: "tecnologia" })
  @ApiQuery({ name: "orderBy", required: false, example: "nome" })
  @ApiQuery({ name: "ascending", required: false, example: true })
  @ApiResponse({ status: 200, description: "Lista paginada de setores ativos" })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query)
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar setor por ID" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Setor encontrado com sucesso" })
  @ApiResponse({ status: 404, description: "Setor não encontrado" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar setor existente" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Setor atualizado com sucesso" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateSetorDto) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover (soft delete) setor" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Setor removido com sucesso" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
