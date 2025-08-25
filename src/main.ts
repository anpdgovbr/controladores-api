import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Express, Response } from 'express';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // 🔒 Confiar nos headers do proxy (X-Forwarded-For / X-Forwarded-Proto)
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set('trust proxy', 1);

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

  // ✅ CORS (ajuste a lista conforme necessário)
  app.enableCors({
    origin: ['https://dim.dev.anpd.gov.br', 'https://controlador-api.dev.anpd.gov.br'],
    credentials: true,
  });

  // ✅ Swagger (habilitado se ambiente interno OU se variável habilitar)
  const enableSwagger = process.env.ENABLE_SWAGGER === 'true' || process.env.NODE_ENV !== 'production';

  if (enableSwagger) {
    const swaggerBaseUrl =
      process.env.SWAGGER_BASE_URL ?? `http://localhost:${process.env.PORT ?? 4000}`;

    const config = new DocumentBuilder()
      .setTitle('Cadastro de Controladores')
      .setDescription('API para gerenciamento conforme LGPD')
      .setVersion('1.0')
      // .addBearerAuth() // descomente se usar JWT
      .addServer(swaggerBaseUrl)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // UI em /docs e JSON em /docs-json (evita conflito com /api)
    const docsPath = 'docs';
    const jsonPath = 'docs-json';

    SwaggerModule.setup(docsPath, app, document, {
      jsonDocumentUrl: `/${jsonPath}`,
      customSiteTitle: 'Controladores API — Swagger',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
      },
    });

    // endpoint explícito para o JSON (útil para ferramentas externas)
    expressApp.get(`/${jsonPath}`, (_req, res: Response) => {
      res.json(document);
    });
  }

  // Porta definida via ambiente (ecosystem.config.cjs)
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}

void bootstrap();
