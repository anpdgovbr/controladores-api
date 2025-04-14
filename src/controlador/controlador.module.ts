import { Module } from '@nestjs/common';
import { ControladorService } from './controlador.service';
import { ControladorController } from './controlador.controller';

@Module({
  providers: [ControladorService],
  controllers: [ControladorController],
})
export class ControladorModule {}
