import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishService: WishesService
  ) {}

  @Get('me')
  async findMe(@Req() req) {
    const user = await this.usersService.findOne({ where: { id: req.user.id } });
    return user;
  }

  @Patch('me')
  async updateMe(@Req() req, @Body() body: UpdateUserDto) {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Тело запроса не должно быть пустым');
    }
    const userId = req.user.id;
    const user = await this.usersService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    //TODO: пользователь может редактировать только свой профиль, при изменении пароля не забывайте хешировать его

    return await this.usersService.save({ id: userId, ...body });
  }

  @Get('me/wishes')
  async getWishes(@Req() req) {
    const userId = req.user.id;
    const wishesByUser = await this.wishService.findMany({
      where: { owner: { id: userId } },
      relations: ['owner', 'offers'],
      order: { createAt: 'DESC' }
    });

    if (!wishesByUser) {
      throw new NotFoundException('Не найдено');
    }

    return wishesByUser;
  }

  @Get(':username')
  async findUserByName(@Param('username') username: string) {
    const users = await this.usersService.findMany({ where: { username } });

    if (!users) {
      throw new NotFoundException('Пользователь не найден');
    }

    return users;
  }

  @Get(':username/wishes')
  async findWishes(@Param('username') username: string) {
    const wishesByUser = await this.wishService.findMany({
      where: { owner: { username } },
      relations: ['owner', 'offers'],
      order: { createAt: 'DESC' }
    });

    if (!wishesByUser) {
      throw new NotFoundException('Не найдено');
    }

    return wishesByUser;
  }

  @Post('find')
  async findMany(@Body() dto: FindUserDto) {
    const { query } = dto;
    const users = await this.usersService.findMany({ where: [{ email: query }, { username: query }] });
    return users;
  }
}
