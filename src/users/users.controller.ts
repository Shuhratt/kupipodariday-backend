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
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishService: WishesService
  ) {}

  @Get('me')
  @ApiCreatedResponse({ type: UserResponseDto })
  async findMe(@Req() req) {
    const userId = req.user.id;
    const user = await this.usersService.findOne({ where: { id: userId } });
    return user;
  }

  @Patch('me')
  @ApiCreatedResponse({ type: UserResponseDto })
  async updateMe(@Req() req, @Body() body: UpdateUserDto) {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Тело запроса не должно быть пустым');
    }
    const userId = req.user.id;
    const user = await this.usersService.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const newData = {
      ...body
    };

    if (body.password) {
      const passwordHash = await bcrypt.hash(body.password, 10);
      newData.password = passwordHash;
    }

    return await this.usersService.save({ id: userId, ...newData });
  }

  @Get('me/wishes')
  @ApiCreatedResponse({ type: UserResponseDto, isArray: true })
  async getWishes(@Req() req) {
    const userId = req.user.id;
    const wishesByUser = await this.wishService.findMany({
      where: { owner: { id: userId } },
      relations: ['owner', 'offers'],
      order: { createAt: 'DESC' }
    });

    return wishesByUser;
  }

  @Get(':username')
  @ApiCreatedResponse({ type: UserResponseDto, isArray: true })
  async findUserByName(@Param('username') username: string) {
    const users = await this.usersService.findMany({ where: { username } });
    return users;
  }

  @Get(':username/wishes')
  @ApiCreatedResponse({ type: WishResponseDto, isArray: true })
  async findWishes(@Param('username') username: string) {
    const wishesByUser = await this.wishService.findMany({
      where: { owner: { username } },
      relations: ['owner', 'offers'],
      order: { createAt: 'DESC' }
    });

    return wishesByUser;
  }

  @Post('find')
  @ApiCreatedResponse({ type: UserResponseDto, isArray: true })
  async findMany(@Body() dto: FindUserDto) {
    const { query } = dto;
    const users = await this.usersService.findMany({ where: [{ email: query }, { username: query }] });
    return users;
  }
}
