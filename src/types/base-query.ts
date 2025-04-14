import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseQueryParams {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 10;

  @ApiPropertyOptional({ example: 'tecnologia', default: '' })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 'nome', default: 'id' })
  @IsOptional()
  orderBy: string = 'id';

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  ascending: boolean = true;
}

export interface BasePaginatedResponse<T> {
  data: T[];
  total: number;
}
