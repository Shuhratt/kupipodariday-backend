import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistsRepository: Repository<Wishlist>,
    @InjectRepository(Wishlist) private wishRepository: Repository<Wish>,
    private readonly dataSourse: DataSource
  ) {}

  async create(userId: number, createWishlistDto: CreateWishlistDto) {
    const { itemsId, ...body } = createWishlistDto;
    return await this.dataSourse.transaction(async (mananger) => {
      const items = await mananger.find(Wish, { where: itemsId.map((id) => ({ id })) });

      if (items.length !== itemsId.length) {
        throw new BadRequestException('Один или несколько подарков не найдены');
      }

      const wishlist = mananger.create(Wishlist, { owner: { id: userId }, ...body, items });

      return await this.wishlistsRepository.save(wishlist);
    });
  }

  async findAll(userId: number) {
    return await this.wishlistsRepository.find({ where: { owner: { id: userId } }, relations: ['owner', 'items'] });
  }

  async findOne(userId: number, wishlistId: number) {
    return await this.wishlistsRepository.findOne({
      where: { id: wishlistId, owner: { id: userId } },
      relations: ['owner', 'items']
    });
  }

  async updateOne(userId: number, wishlistId: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlistByUserId = await this.wishlistsRepository.find({ where: { owner: { id: userId }, id: wishlistId } });

    if (!wishlistByUserId.length) {
      throw new ConflictException('Нет доступа для обновления');
    }

    return await this.wishlistsRepository.update(wishlistId, updateWishlistDto);
  }

  async removeOne(userId: number, wishlistId: number) {
    const wishlistByUserId = await this.wishlistsRepository.find({ where: { owner: { id: userId }, id: wishlistId } });

    if (!wishlistByUserId.length) {
      throw new ConflictException('Нет доступа для удаления');
    }

    await this.wishlistsRepository.delete(wishlistId);
  }
}
