import { Module } from '@nestjs/common';
import { CnaeService } from './cnae.service';
import { CnaeController } from './cnae.controller';

@Module({
  providers: [CnaeService],
  controllers: [CnaeController],
})
export class CnaeModule {}
