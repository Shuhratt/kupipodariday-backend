import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делает ConfigModule доступным глобально
      envFilePath: ['env/.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // модули которые должны быть загружены перед использованием фабрики (useFactory).
      inject: [ConfigService], // указываем зависимости, которые будут внедрены в фабричную функцию в качестве аргументов
      useFactory: (configService: ConfigService) => {
        return getTypeOrmConfig<TypeOrmModuleAsyncOptions>(configService);
      }
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
