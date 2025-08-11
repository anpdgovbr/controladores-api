import { Module } from '@nestjs/common';
import { CnaeController } from './cnae.controller';
import { CnaeService } from './cnae.service';

@Module({
  providers: [CnaeService],
  controllers: [CnaeController],
})
export class CnaeModule {}
