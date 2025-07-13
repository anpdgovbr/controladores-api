import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Express, Response } from 'express';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
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

  // ✅ Auth guard
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
