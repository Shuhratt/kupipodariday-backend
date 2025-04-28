import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Регистрация глобального фильтра
  app.useGlobalFilters(new GlobalExceptionFilter());
  // Получаем ConfigService из контейнера зависимостей
  const configService = app.get(ConfigService);

  // Используем ConfigService для получения порта
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
