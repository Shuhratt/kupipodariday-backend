import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepository: Repository<Wish>) {}

  async create(userId: string, createWishDto: CreateWishDto) {
    const wish = this.wishRepository.create({ owner: { id: userId }, ...createWishDto });
    return await this.wishRepository.save(wish);
  }

  async findMany(...params: Parameters<typeof this.wishRepository.find>) {
    return await this.wishRepository.find(...params);
  }
}
