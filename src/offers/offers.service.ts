import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepository: Repository<Offer>) {}

  async create(userId: number, createOfferDto: CreateOfferDto) {
    const offer = this.offerRepository.create({ user: { id: userId }, ...createOfferDto });
    return await this.offerRepository.save(offer);
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
}
