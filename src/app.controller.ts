import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Informações do sistema' })
  getRoot() {
    return {
      sistema: 'Cadastro de Controladores - ANPD',
      descricao:
        'API para gerenciamento de controladores, encarregados e grupos econômicos conforme LGPD',
      versao: '1.0.0',
      documentacao: {
        swagger: '/api',
        openapiJson: '/swagger-json',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
