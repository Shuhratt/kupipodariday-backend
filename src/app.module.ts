import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает ConfigModule доступным глобально
      envFilePath: ['env/.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // модули которые должны быть загружены перед использованием фабрики (useFactory).
      inject: [ConfigService], // указывает зависимости, которые будут внедрены в фабричную функцию в качестве аргументов
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [],
        synchronize: true // FIXME: В production отключить
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
