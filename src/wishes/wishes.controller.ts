import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
  getWishesLast() {
    const wishes = this.wishesService.findMany({ order: { createAt: 'DESC' } });
  }

  @Get('top')
  getWishesTop() {}

  @Get(':id')
  getWishById(@Req() req, @Param() param) {}

  @Patch(':id')
  updateWishById(@Req() req, @Param() param) {}

  @Delete(':id')
  deleteByWishId(@Req() req, @Param() param) {}

  @Post(':id/copy')
  wishCopy(@Req() req, @Param() param) {}
}
