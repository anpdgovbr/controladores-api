import { Module } from '@nestjs/common';
import { GrupoEconomicoService } from './grupo-economico.service';
import { GrupoEconomicoController } from './grupo-economico.controller';

@Module({
  providers: [GrupoEconomicoService],
  controllers: [GrupoEconomicoController],
})
export class GrupoEconomicoModule {}
