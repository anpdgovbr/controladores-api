import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEncarregadoDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'joao@empresa.com.br' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '(61) 99999-0000' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ example: true, description: 'Se é DPO terceirizado' })
  @IsBoolean()
  externo: boolean;

  @ApiPropertyOptional({
    example: 2,
    description: 'ID do controlador que atua como empresa DPO (opcional)',
  })
  @IsOptional()
  @IsInt()
  controladorEmpresaExternaId?: number;

  @ApiProperty({ example: 1, description: 'ID do controlador principal' })
  @IsInt()
  controladorId: number;
}
