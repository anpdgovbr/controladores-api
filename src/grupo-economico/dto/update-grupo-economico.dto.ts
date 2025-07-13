import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGrupoEconomicoDto {
  @ApiPropertyOptional({ example: 'Grupo XP Inc.' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({
    example: 'Holding de investimentos, grupo financeiro',
  })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
