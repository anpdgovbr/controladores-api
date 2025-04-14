import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { TipoControlador } from '@prisma/client';

export class UpdateControladorDto {
  @ApiPropertyOptional({ example: 'Empresa Exemplo LTDA' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ enum: TipoControlador })
  @IsOptional()
  @IsEnum(TipoControlador)
  tipo?: TipoControlador;

  @ApiPropertyOptional({ example: '12345678000199' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({ example: '12345678900' })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({ example: 'https://empresa.com.br' })
  @IsOptional()
  @IsUrl()
  site?: string;

  @ApiPropertyOptional({ example: 'contato@empresa.com.br' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '(61) 99999-0000' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({ example: 'https://empresa.com.br/politica' })
  @IsOptional()
  @IsUrl()
  politicaPrivacidadeUrl?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  setorId?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  cnaeId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  grupoEconomicoId?: number;
}
