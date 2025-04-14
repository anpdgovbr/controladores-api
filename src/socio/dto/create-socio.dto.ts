import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TipoParticipacaoSocietaria } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSocioDto {
  @ApiProperty({ example: 'Maria da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: '12345678900' })
  @IsString()
  cpfCnpj: string;

  @ApiProperty({ enum: TipoParticipacaoSocietaria })
  @IsEnum(TipoParticipacaoSocietaria)
  tipoParticipacao: TipoParticipacaoSocietaria;

  @ApiPropertyOptional({ example: 'Brasileira' })
  @IsOptional()
  @IsString()
  nacionalidade?: string;
}
