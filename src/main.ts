import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import type { Request, Response } from 'express'; // ✅ Tipar corretamente o Express

async function bootstrap(): Promise<void> {
  // ✅ Cria a aplicação NestJS normalmente
  const app = await NestFactory.create(AppModule);

  // ✅ Validação global para DTOs, QueryParams, etc
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ✅ Filtro global para capturar erros do Prisma de forma amigável
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // ✅ Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('Cadastro de Controladores')
    .setDescription(
      'API para gerenciamento de controladores, encarregados e grupo econômico conforme LGPD',
    )
    .setVersion('1.0')
    .addServer('/') // importante para Swagger funcionar no path correto
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ✅ Setup da interface Swagger na rota /api
  SwaggerModule.setup('api', app, document);

  // ✅ Endpoint para obter o JSON cru do Swagger (útil para integrar em portais ou documentação externa)
  const expressInstance = app.getHttpAdapter().getInstance();
  expressInstance.get('/swagger-json', (_req: Request, res: Response) => {
    res.json(document);
  });

  // ✅ MUITO IMPORTANTE: inicializa manualmente o app Nest
  await app.init();

  // ✅ Carregar certificados SSL (reutilizando os do backlog-dim)
  const keyPath = path.resolve('/home/anpdadmin/backlog-dim/dev-key.pem');
  const certPath = path.resolve('/home/anpdadmin/backlog-dim/dev-cert.pem');

  const httpsOptions: https.ServerOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  // ✅ Criar manualmente o HTTPS server baseado na instância Express
  const server = https.createServer(httpsOptions, expressInstance);

  const PORT = parseInt(process.env.PORT ?? '3001', 10);

  // ✅ Iniciar o servidor HTTPS
  await new Promise<void>((resolve) => {
    server.listen(PORT, () => {
      console.log(
        `🚀 cadastro-controladores-api rodando com HTTPS na porta ${PORT}`,
      );
      resolve();
    });
  });
}

// ✅ Corrige floating promise do ESLint
void bootstrap();
