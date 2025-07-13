import { PrismaClient } from '@prisma/client';
import { seedSetores } from './setores';
import { seedCnaes } from './cnaes';

const prisma = new PrismaClient();

async function main() {
  await seedSetores(prisma);
  await seedCnaes(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
