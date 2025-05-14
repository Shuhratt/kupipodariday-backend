import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { WishResponseDto } from 'src/wishes/dto/wish-response.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

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
  async findMe(@Req() req: Request) {
    const userId = req.user?.id;
    const user = await this.usersService.findOne({ where: { id: userId } });
    return user;
  }

  @Patch('me')
  @ApiCreatedResponse({ type: UserResponseDto })
  async updateMe(@Req() req: Request, @Body() body: UpdateUserDto) {
    const userId = req.user.id;
    await this.usersService.updateMe(userId, body);
  }

  @Get('me/wishes')
  @ApiCreatedResponse({ type: UserResponseDto, isArray: true })
  async getWishes(@Req() req: Request) {
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
