import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.code === 'P2002') {
    const target = Array.isArray(exception.meta?.target)
  ? exception.meta.target.join(', ')
  : 'campo único';

      return response
        .status(400)
        .json({ message: `Já existe um registro com esse ${target}` });
    }

    return response.status(500).json({
      message: 'Erro interno no servidor (Prisma)',
      error: exception.message,
    });
  }
}
