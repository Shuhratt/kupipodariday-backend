import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const getTypeOrmConfig = <R extends TypeOrmModuleAsyncOptions | DataSourceOptions>(
  configService: ConfigService
): R =>
  ({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: ['dist/**/*.entity.js'], // Путь к сущностям
    migrations: ['src/database/migrations/*{.ts,.js}'], // Путь к миграциям
    synchronize: false, // Отключите synchronize при использовании миграций
    logging: configService.get<string>('MODE') === 'development' // Логирование
  }) as R;
