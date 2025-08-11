import { IsString, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateGrupoEconomicoDto {
  @ApiProperty({ example: "Grupo XP Inc." })
  @IsString()
  nome: string

  @ApiProperty({ required: false, example: "Holding de investimentos" })
  @IsOptional()
  @IsString()
  observacoes?: string
}
