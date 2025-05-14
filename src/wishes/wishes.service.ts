import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { DataSource, LessThan, Repository } from 'typeorm';
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

  async updateOne(userId: number, wishId: string, wish: UpdateWishDto) {
    const wishById = await this.wishRepository.findOne({
      where: { id: +wishId, owner: { id: userId }, raised: LessThan(1) } // обновить подарок на который никто не скинулся
    });

    if (!wishById) {
      throw new ConflictException('Нет возможности для обновления');
    }

    await this.wishRepository.update(wishId, wish);
  }

  async removeOne(...params: Parameters<typeof this.wishRepository.delete>) {
    return await this.wishRepository.delete(...params);
  }

  async copyWish(userId: number, wishId: number) {
    //начало transaction
    return await this.dataSource.transaction(async (manager) => {
      const wishById = await manager.findOne(Wish, { where: { id: wishId } });

      if (!wishById) {
        throw new NotFoundException('Не найдено');
      }

      const { name, link, image, price, description } = wishById;

      const existingCopy = await manager.findOne(Wish, {
        where: {
          owner: { id: userId },
          name,
          link,
          image,
          price,
          description
        }
      });

      if (existingCopy) {
        throw new BadRequestException('Вы уже скопировали этот подарок');
      }

      await manager.save(Wish, { name, link, image, price, description, owner: { id: userId } });
      await manager.update(Wish, wishId, { copied: () => `copied + 1` });
    });
  }
}
