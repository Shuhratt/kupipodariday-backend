import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает ConfigModule доступным глобально
      envFilePath: ['env/.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // модули которые должны быть загружены перед использованием фабрики (useFactory).
      inject: [ConfigService], // указываем зависимости, которые будут внедрены в фабричную функцию в качестве аргументов
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: ['dist/**/*.entity.js'],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development'
      })
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
