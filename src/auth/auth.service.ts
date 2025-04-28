import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/sing-in.dto';
import { SignupDto } from './dto/sing-up.dtp';
import { JwtStrategy } from './jwt.strategy';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Доступен через UsersModule
    private jwtService: JwtService, // Доступен через JwtModule
    private jwtStrategy: JwtStrategy // Доступен через providers
  ) {}

  async singIn(dto: SigninDto) {
    const user = await this.jwtStrategy.validate({ email: dto.email });
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const payload = { sub: user.id, username: user.username };

    return { access_token: this.jwtService.sign(payload) };
  }

  async singUp(dto: SignupDto) {
    // const { password, ...user } = dto;
    /**
     * хэшировать пароль
     * создать в базе
     */

    const passwordHash = await bcrypt.hash(dto.password, 10);

    this.usersService.create(dto);
  }
}
