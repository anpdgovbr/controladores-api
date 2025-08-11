import { IsNumber, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class AddSocioControladorDto {
  @ApiProperty({ example: 1 })
  socioId: number

  @ApiProperty({ example: 25.0, required: false })
  @IsOptional()
  @IsNumber()
  percentual?: number
}
