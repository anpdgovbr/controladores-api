import { ApiPropertyOptional } from "@nestjs/swagger"
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator"

export class UpdateEncarregadoDto {
  @ApiPropertyOptional({ example: "João da Silva" })
  @IsOptional()
  @IsString()
  nome?: string

  @ApiPropertyOptional({ example: "joao@empresa.com.br" })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ example: "(61) 99999-0000" })
  @IsOptional()
  @IsString()
  telefone?: string

  @ApiPropertyOptional({
    example: true,
    description: "Se é um encarregado externo (DPO terceirizado)",
  })
  @IsOptional()
  @IsBoolean()
  externo?: boolean

  @ApiPropertyOptional({
    example: 2,
    description: "ID do controlador que atua como empresa DPO (opcional)",
  })
  @IsOptional()
  @IsInt()
  controladorEmpresaExternaId?: number

  @ApiPropertyOptional({
    example: 1,
    description: "ID do controlador principal",
  })
  @IsOptional()
  @IsInt()
  controladorId?: number
}
