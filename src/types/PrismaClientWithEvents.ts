// src/types/PrismaClientWithEvents.ts
import type { PrismaClient } from '@prisma/client';

export type PrismaClientWithEvents = PrismaClient & {
  $on(event: 'beforeExit', callback: () => void): void;
};
