import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const message = exception.getResponse();

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // меняем объект ответа
    response.status(status).json({
      error: {
        status: status,
        message: message,
        method: request.method,
        url: request.url
      }
    });
  }
}
