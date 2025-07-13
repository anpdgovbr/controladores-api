import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSetorDto {
  @ApiProperty({ example: 'Tecnologia' })
  @IsString()
  nome: string;
}
