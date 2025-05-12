import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('wishlistlists')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.id;
    return await this.wishlistsService.findAll(userId);
  }

  @Post()
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    const userId = req.user.id;
    return this.wishlistsService.create(userId, createWishlistDto);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') wishlistId: string) {
    const userId = req.user.id;
    return this.wishlistsService.findOne(userId, +wishlistId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Req() req, @Param('id') wishlistId: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    const userId = req.user.id;
    return this.wishlistsService.updateOne(userId, +wishlistId, updateWishlistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Req() req, @Param('id') wishlistId: string) {
    const userId = req.user.id;
    return this.wishlistsService.removeOne(userId, +wishlistId);
  }
}
