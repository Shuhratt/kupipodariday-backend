import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ConflictException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('wishes')
@UseGuards(JwtGuard)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    const userId = req.user.id;
    return this.wishesService.create(userId, createWishDto);
  }

  @Get('last')
  async getWishesLast() {
    return await this.wishesService.findMany({ order: { createAt: 'DESC' } });
  }

  @Get('top')
  async getWishesTop() {
    return await this.wishesService.findMany({ order: { copied: 'DESC' } });
  }

  @Get(':id')
  async getWishById(@Param('id') wishId: string) {
    return await this.wishesService.findOne({
      where: { id: +wishId },
      relations: ['owner', 'items']
    });
  }

  @Patch(':id')
  async updateWishById(@Req() req, @Param('id') idWish: string, @Body() wish: UpdateWishDto) {
    const userId = req.user.id;
    return await this.wishesService.updateOne(userId, idWish, wish);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteByWishId(@Req() req, @Param('id') wishId: string) {
    const userId = req.user.id;
    const wishById = await this.wishesService.findOne({ where: { id: +wishId, owner: { id: userId } } });

    if (!wishById) {
      throw new ConflictException('Нет доступа для удаления');
    }

    await this.wishesService.removeOne(wishId);
  }

  @Post(':id/copy')
  @HttpCode(HttpStatus.CREATED)
  async wishCopy(@Req() req, @Param('id') wishId: string) {
    const userId = req.user.id;
    await this.wishesService.copyWish(userId, +wishId);
  }
}
