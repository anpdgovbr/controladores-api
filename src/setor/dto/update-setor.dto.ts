import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateSetorDto {
  @ApiPropertyOptional({ example: "Tecnologia" })
  @IsOptional()
  @IsString()
  nome?: string
}
