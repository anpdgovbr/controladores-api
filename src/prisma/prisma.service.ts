import {
  Injectable,
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { PrismaClientWithEvents } from 'src/types/PrismaClientWithEvents';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    (this as PrismaClientWithEvents).$on('beforeExit', () => {
      void app.close();
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
