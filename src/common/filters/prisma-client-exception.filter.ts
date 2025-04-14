import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
  implements ExceptionFilter<PrismaClientKnownRequestError>
{
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Erro inesperado no banco de dados.';

    switch (exception.code) {
      case 'P2002': {
        const fields = exception.meta?.target as string[] | undefined;

        if (fields?.includes('cnpj')) {
          message = 'Já existe um controlador com este CNPJ.';
        } else if (fields?.includes('cpf')) {
          message = 'Já existe um controlador com este CPF.';
        } else if (fields?.includes('email')) {
          message = 'Este e-mail já está em uso.';
        } else {
          message = `Campo(s) único(s) em conflito: ${fields?.join(', ')}`;
        }

        break;
      }
      case 'P2003':
        const field = exception.meta?.field_name as string;
        if (field?.includes('controladorEmpresaExternaId')) {
          message =
            'Empresa externa responsável pelo encarregado informado não existe.';
        } else if (field?.includes('controladorId')) {
          message = 'Controlador informado não existe.';
        } else {
          message = 'Relacionamento inválido: item referenciado não existe.';
        }
        break;
      case 'P2025':
        message = 'Registro não encontrado para a operação solicitada.';
        break;
      default:
        message = exception.message;
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
