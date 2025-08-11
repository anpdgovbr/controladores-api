import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Express, Response } from 'express';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // ✅ Validação
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ✅ Filtro do Prisma
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // ✅ Swagger
  const config = new DocumentBuilder()
    .setTitle('Cadastro de Controladores')
    .setDescription('API para gerenciamento conforme LGPD')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const expressApp = app.getHttpAdapter().getInstance() as Express;

  expressApp.get('/swagger-json', (_req, res: Response) => {
    res.json(document);
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
