import { ConflictException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WishlistsService {
  constructor(@InjectRepository(Wishlist) private wishlistsRepository: Repository<Wishlist>) {}

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const wish = this.wishlistsRepository.create({ owner: { id: userId }, ...createWishlistDto });
    return await this.wishlistsRepository.save(wish);
  }

  async findAll(userId: number) {
    return await this.wishlistsRepository.find({ where: { owner: { id: userId } } });
  }

  async findOne(userId: number, wishlistId: number) {
    return await this.wishlistsRepository.findOne({
      where: { id: wishlistId, owner: { id: userId } },
      relations: ['owner']
    });
  }

  async updateOne(userId: number, wishlistId: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlistByUserId = await this.wishlistsRepository.find({ where: { owner: { id: userId }, id: wishlistId } });

    if (!wishlistByUserId) {
      throw new ConflictException('Нет доступа для обновления');
    }

    return await this.wishlistsRepository.update(wishlistId, updateWishlistDto);
  }

  async removeOne(userId: number, wishlistId: number) {
    const wishlistByUserId = await this.wishlistsRepository.find({ where: { owner: { id: userId }, id: wishlistId } });

    if (!wishlistByUserId) {
      throw new ConflictException('Нет доступа для удаления');
    }

    await this.wishlistsRepository.delete(wishlistId);
  }
}
