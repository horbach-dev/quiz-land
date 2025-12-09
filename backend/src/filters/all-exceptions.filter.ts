import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'Внутренняя ошибка сервера';

    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (this.isHttpExceptionResponse(responseBody)) {
        message = responseBody.message;
      }
    } else if (exception instanceof Error) {
      this.logger.error(
        `[${request.method} ${request.url}]`,
        exception.stack,
        exception.name,
      );
      message =
        process.env.NODE_ENV === 'development'
          ? exception.message
          : 'Внутренняя ошибка сервера';
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      message: Array.isArray(message) ? message.join(', ') : String(message),
      data: null,
      error:
        status >= 500
          ? 'ServerError'
          : exception instanceof Error
            ? exception.constructor.name
            : 'Bad Request',
    };

    response.status(status).json(errorResponse);
  }

  private isHttpExceptionResponse(
    response: unknown,
  ): response is HttpExceptionResponse {
    if (response === null || typeof response !== 'object') {
      return false;
    }

    if (!('message' in response)) {
      return false;
    }

    return (
      typeof response.message === 'string' || Array.isArray(response.message)
    );
  }
}
