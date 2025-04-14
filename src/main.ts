import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validação global (DTOs, query, etc.)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ✅ Filtro de exceções do Prisma (em português, customizado)
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Cadastro de Controladores')
    .setDescription(
      'API para gerenciamento de controladores, encarregados e grupo econômico conforme LGPD',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Interface Swagger interativa
  SwaggerModule.setup('api', app, document);

  // Endpoint para obter JSON do Swagger
  app.getHttpAdapter().get('/swagger-json', (_req, res) => {
    res.json(document);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
