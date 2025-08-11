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
import { EncarregadoService } from "./encarregado.service"
import { CreateEncarregadoDto } from "./dto/create-encarregado.dto"
import { UpdateEncarregadoDto } from "./dto/update-encarregado.dto"
import { BaseQueryParams } from "src/types/base-query"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from "@nestjs/swagger"

@ApiTags("Encarregados")
@Controller("encarregados")
export class EncarregadoController {
  constructor(private readonly service: EncarregadoService) {}

  @Post()
  @ApiOperation({ summary: "Criar novo encarregado de dados (DPO)" })
  @ApiResponse({ status: 201, description: "Encarregado criado com sucesso" })
  create(@Body() dto: CreateEncarregadoDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Listar encarregados ativos" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "pageSize", required: false, example: 10 })
  @ApiQuery({ name: "search", required: false, example: "joao@empresa.com" })
  @ApiQuery({ name: "orderBy", required: false, example: "nome" })
  @ApiQuery({ name: "ascending", required: false, example: true })
  @ApiResponse({ status: 200, description: "Lista paginada de encarregados" })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query)
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar encarregado por ID" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Encarregado encontrado com sucesso",
  })
  @ApiResponse({ status: 404, description: "Encarregado não encontrado" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar dados do encarregado" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Encarregado atualizado com sucesso",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateEncarregadoDto
  ) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover (soft delete) encarregado" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Encarregado removido com sucesso" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
