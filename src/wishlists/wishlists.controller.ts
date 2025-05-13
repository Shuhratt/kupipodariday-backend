import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistResponseDto } from './dto/wishlists-response.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('wishlistlists')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  @ApiCreatedResponse({
    type: WishlistResponseDto,
    isArray: true
  })
  async findAll(@Req() req) {
    const userId = req.user.id;
    return await this.wishlistsService.findAll(userId);
  }

  @Post()
  @ApiCreatedResponse({
    type: WishlistResponseDto
  })
  create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    const userId = req.user.id;
    return this.wishlistsService.create(userId, createWishlistDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: WishlistResponseDto
  })
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
