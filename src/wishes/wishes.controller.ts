import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ConflictException,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishResponseDto } from './dto/wish-response.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiCreatedResponse({ type: WishResponseDto })
  create(@Req() req: Request, @Body() createWishDto: CreateWishDto) {
    const userId = req.user.id;
    return this.wishesService.create(userId, createWishDto);
  }

  @Get('last')
  @ApiCreatedResponse({ type: WishResponseDto, isArray: true })
  async getWishesLast() {
    return await this.wishesService.findMany({ order: { createAt: 'DESC' }, take: 40 });
  }

  @Get('top')
  @ApiCreatedResponse({ type: WishResponseDto, isArray: true })
  async getWishesTop() {
    return await this.wishesService.findMany({ order: { copied: 'DESC' }, take: 10 });
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @ApiCreatedResponse({ type: WishResponseDto })
  async getWishById(@Param('id') wishId: string) {
    return await this.wishesService.findOne({
      where: { id: +wishId },
      relations: { offers: true, owner: true, wishlists: true }
    });
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  async updateWishById(@Req() req: Request, @Param('id') idWish: string, @Body() wish: UpdateWishDto) {
    const userId = req.user.id;
    return await this.wishesService.updateOne(userId, idWish, wish);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.OK)
  async deleteByWishId(@Req() req: Request, @Param('id') wishId: string) {
    const userId = req.user.id;
    const wishById = await this.wishesService.findOne({ where: { id: +wishId, owner: { id: userId } } });

    if (!wishById) {
      throw new ConflictException('Нет доступа для удаления');
    }

    await this.wishesService.removeOne(wishId);
  }

  @Post(':id/copy')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.CREATED)
  async wishCopy(@Req() req: Request, @Param('id') wishId: string) {
    const userId = req.user.id;
    await this.wishesService.copyWish(userId, +wishId);
  }
}
