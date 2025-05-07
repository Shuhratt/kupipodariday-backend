import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
    private readonly dataSource: DataSource
  ) {}

  async create(userId: number, createWishDto: CreateWishDto) {
    const wish = this.wishRepository.create({ owner: { id: userId }, ...createWishDto });
    return await this.wishRepository.save(wish);
  }

  async findMany(...params: Parameters<typeof this.wishRepository.find>) {
    return await this.wishRepository.find(...params);
  }

  async findOne(...params: Parameters<typeof this.wishRepository.findOne>) {
    return await this.wishRepository.findOne(...params);
  }

  async updateOne(userId: string, wishId: string, wish: UpdateWishDto) {
    const wishById = await this.wishRepository.findOne({ where: { id: +wishId, owner: { id: +userId } } });

    if (!wishById) {
      throw new ConflictException('Нет доступа для обновления');
    }

    await this.wishRepository.update(wishId, wish);
  }

  async removeOne(...params: Parameters<typeof this.wishRepository.delete>) {
    return await this.wishRepository.delete(...params);
  }

  async copyWish(userId: number, wishId: number) {
    return this.dataSource.transaction(async (manager) => {
      const wishById = await manager.findOne(Wish, { where: { id: wishId } });

      if (!wishById) {
        throw new NotFoundException('Не найдено');
      }

      const { id: idCopyWish, name, link, image, price, description, copied } = wishById;

      await manager.save(Wish, { name, link, image, price, description, owner: { id: userId } });
      await manager.update(Wish, idCopyWish, { copied: copied + 1 });
    });
  }
}
