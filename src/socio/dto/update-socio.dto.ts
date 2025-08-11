import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, IsEnum } from "class-validator"
import { TipoParticipacaoSocietaria } from "@prisma/client"

export class UpdateSocioDto {
  @ApiPropertyOptional({ example: "Maria da Silva" })
  @IsOptional()
  @IsString()
  nome?: string

  @ApiPropertyOptional({ example: "12345678900" })
  @IsOptional()
  @IsString()
  cpfCnpj?: string

  @ApiPropertyOptional({ enum: TipoParticipacaoSocietaria })
  @IsOptional()
  @IsEnum(TipoParticipacaoSocietaria)
  tipoParticipacao?: TipoParticipacaoSocietaria

  @ApiPropertyOptional({ example: "Brasileira" })
  @IsOptional()
  @IsString()
  nacionalidade?: string
}
