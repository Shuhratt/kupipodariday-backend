import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  findMe(@Req() req) {
    console.log(req);
  }

  @Patch('me')
  updateOne() {}

  @Get('me/wishes')
  getwishes() {}

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
  @Get(':username/wishes')
  findOneWishes(@Param('username') username: string) {}

  @Post('find')
  @UsePipes(new ValidationPipe()) // Включаем валидацию
  find(@Body() dto: FindUserDto) {
    const { query } = dto;
  }
}
