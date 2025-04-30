import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/sing-up.dtp';
import { SigninDto } from './dto/sing-in.dto';

@Controller()
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Вход */
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto) {
    return this.authService.singIn(dto);
  }

  /** Регистрация */
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() dto: SignupDto) {
    return this.authService.singUp(dto);
  }
}
