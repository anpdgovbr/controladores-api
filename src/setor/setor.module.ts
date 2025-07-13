import { Module } from '@nestjs/common';
import { SetorService } from './setor.service';
import { SetorController } from './setor.controller';

@Module({
  providers: [SetorService],
  controllers: [SetorController],
})
export class SetorModule {}
