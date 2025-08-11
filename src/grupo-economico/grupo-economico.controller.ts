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
} from "@nestjs/common"
import { GrupoEconomicoService } from "./grupo-economico.service"
import { CreateGrupoEconomicoDto } from "./dto/create-grupo-economico.dto"
import { UpdateGrupoEconomicoDto } from "./dto/update-grupo-economico.dto"
import { BaseQueryParams } from "src/types/base-query"
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger"

@ApiTags("Grupos Econômicos")
@Controller("grupos-economicos")
export class GrupoEconomicoController {
  constructor(private readonly service: GrupoEconomicoService) {}

  @Post()
  @ApiOperation({ summary: "Criar novo grupo econômico" })
  @ApiResponse({ status: 201, description: "Grupo criado com sucesso" })
  create(@Body() dto: CreateGrupoEconomicoDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Listar grupos econômicos ativos" })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "pageSize", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiResponse({ status: 200, description: "Lista paginada" })
  findAll(@Query() query: BaseQueryParams) {
    return this.service.findAll(query)
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar grupo econômico por ID" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: "Grupo não encontrado" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar grupo econômico" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateGrupoEconomicoDto
  ) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover (soft delete) grupo econômico" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
