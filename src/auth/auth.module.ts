import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET')
      }),
      inject: [ConfigService]
    })
  ], // imports доступен В контроллерах, В сервисах, В любом другом провайдере текущего модуля.
  providers: [AuthService, JwtStrategy], // providers доступен В контроллерах и других провайдерах текущего модуля.
  exports: [AuthService], //доступен В других модулях, которые импортируют текущий модуль, а также внутри текущего модуля.
  controllers: [AuthController]
})
export class AuthModule {}
