import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import type { Express, Response } from "express";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./common/filters/prisma-client-exception.filter";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // 🔒 Confia nos headers do proxy (X-Forwarded-For / X-Forwarded-Proto)
  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set("trust proxy", 1);

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
    .setTitle("Cadastro de Controladores")
    .setDescription("API para gerenciamento conforme LGPD")
    .setVersion("1.0")
    .addServer(process.env.SWAGGER_BASE_URL ?? `http://localhost:${process.env.PORT ?? 4000}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  expressApp.get("/swagger-json", (_req, res: Response) => {
    res.json(document);
  });

  // Porta definida via ambiente (ecosystem.config.cjs)
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}

void bootstrap();
