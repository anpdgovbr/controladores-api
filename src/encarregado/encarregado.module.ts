import { Module } from '@nestjs/common';
import { EncarregadoService } from './encarregado.service';
import { EncarregadoController } from './encarregado.controller';

@Module({
  providers: [EncarregadoService],
  controllers: [EncarregadoController],
})
export class EncarregadoModule {}
