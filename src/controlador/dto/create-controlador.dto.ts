import { TipoControlador } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateControladorDto {
  @ApiProperty({ example: 'Empresa Exemplo S.A.' })
  @IsString()
  nome: string;

  @ApiProperty({ enum: TipoControlador })
  @IsEnum(TipoControlador)
  tipo: TipoControlador;

  @ApiPropertyOptional({ example: '12345678000199' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({ example: '12345678900' })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({ example: 'https://www.empresa.com.br' })
  @IsOptional()
  @IsUrl()
  site?: string;

  @ApiPropertyOptional({ example: 'contato@empresa.com.br' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '(61) 99999-9999' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({
    example: 'https://www.empresa.com.br/politica-privacidade',
  })
  @IsOptional()
  @IsUrl()
  politicaPrivacidadeUrl?: string;

  @ApiPropertyOptional({ example: 3, description: 'ID do Setor vinculado' })
  @IsOptional()
  setorId?: number;

  @ApiPropertyOptional({ example: 5, description: 'ID do CNAE vinculado' })
  @IsOptional()
  cnaeId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID do Grupo Econômico' })
  @IsOptional()
  grupoEconomicoId?: number;
}
