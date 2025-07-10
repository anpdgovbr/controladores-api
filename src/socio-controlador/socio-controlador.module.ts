import { Module } from '@nestjs/common';
import { SocioControladorService } from './socio-controlador.service';
import { SocioControladorController } from './socio-controlador.controller';

@Module({
  providers: [SocioControladorService],
  controllers: [SocioControladorController],
})
export class SocioControladorModule {}
