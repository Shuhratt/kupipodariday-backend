import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { OfferResponseDto } from './dto/offer-response.dto';
import { JwtGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('offers')
@UseGuards(JwtGuard)
@ApiBearerAuth('JWT')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiCreatedResponse({ type: OfferResponseDto })
  async create(@Req() req: Request, @Body() createOfferDto: CreateOfferDto) {
    const userId = req.user.id;
    return this.offersService.create(userId, createOfferDto);
  }

  @Get()
  @ApiCreatedResponse({ type: OfferResponseDto, isArray: true })
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: OfferResponseDto })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
