import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ✅ Filtro de exceções
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

  SwaggerModule.setup('api', app, document);

  app.getHttpAdapter().get('/swagger-json', (_req, res) => {
    res.json(document);
  });

  // ✅ Carregar certificados externos
  const keyPath = path.resolve('/home/anpdadmin/backlog-dim/dev-key.pem');
  const certPath = path.resolve('/home/anpdadmin/backlog-dim/dev-cert.pem');

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  const server = https.createServer(
    httpsOptions,
    app.getHttpAdapter().getInstance(),
  );

  const PORT = parseInt(process.env.PORT || '3000', 10);

  server.listen(PORT, () => {
    console.log(
      `🚀 cadastro-controladores-api rodando com HTTPS na porta ${PORT}`,
    );
  });
}

bootstrap();
