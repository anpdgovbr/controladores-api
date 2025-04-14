import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControladorModule } from './controlador/controlador.module';
import { EncarregadoModule } from './encarregado/encarregado.module';
import { SetorModule } from './setor/setor.module';
import { CnaeModule } from './cnae/cnae.module';
import { GrupoEconomicoModule } from './grupo-economico/grupo-economico.module';
import { SocioModule } from './socio/socio.module';
import { SocioControladorModule } from './socio-controlador/socio-controlador.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ControladorModule,
    EncarregadoModule,
    SetorModule,
    CnaeModule,
    GrupoEconomicoModule,
    SocioModule,
    SocioControladorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
