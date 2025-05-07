import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/sing-in.dto';
import { SignupDto } from './dto/sing-up.dtp';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
// import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Доступен через UsersModule
    private jwtService: JwtService // Доступен через JwtModule
    // private jwtStrategy: JwtStrategy // Доступен через providers
  ) {}

  async singIn(dto: SigninDto) {
    const user = await this.usersService.findOne({ where: { username: dto.username }, select: ['email', 'password'] });

    if (!user) {
      throw new UnauthorizedException('Неверное имя или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверное имя или пароль');
    }

    const payload = { email: user.email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { access_token };
  }

  async singUp(dto: SignupDto) {
    const { password, ...user } = dto;
    const passwordHash = await bcrypt.hash(password, 10);

    const createUser = await this.usersService.create({ ...user, password: passwordHash });
    delete createUser.password;

    return createUser as Omit<User, 'password'>;
  }
}
