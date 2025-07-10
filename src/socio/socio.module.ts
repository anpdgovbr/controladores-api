import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioController } from './socio.controller';

@Module({
  providers: [SocioService],
  controllers: [SocioController],
})
export class SocioModule {}
