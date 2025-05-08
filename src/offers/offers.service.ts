import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private readonly dataSource: DataSource
  ) {}

  async create(userId: number, createOfferDto: CreateOfferDto) {
    return await this.dataSource.transaction(async (mananger) => {
      const offer = mananger.create(Offer, {
        user: { id: userId },
        item: { id: createOfferDto.itemId },
        ...createOfferDto
      });

      await mananger.save(Offer, offer);
      await mananger.update(Wish, createOfferDto.itemId, { raised: () => `raised + ${createOfferDto.amount}` });
      return offer;
    });
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({ id });
  }
}
