import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(dto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(dto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
        throw new ConflictException('Пользователь с таким username и email уже существует');
      }
      throw error;
    }
  }

  async findOne(...params: Parameters<typeof this.userRepository.findOne>) {
    return await this.userRepository.findOne(...params);
  }

  async findMany(...params: Parameters<typeof this.userRepository.find>) {
    return await this.userRepository.find(...params);
  }

  async save(...params: Parameters<typeof this.userRepository.save>) {
    return await this.userRepository.save(...params);
  }

  async updateMe(userId: number, body: UpdateUserDto) {
    try {
      if (Object.keys(body).length === 0) {
        throw new BadRequestException('Тело запроса не должно быть пустым');
      }

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      const newData = {
        ...body
      };

      if (body.password) {
        const passwordHash = await bcrypt.hash(body.password, 10);
        newData.password = passwordHash;
      }

      return await this.userRepository.save({ id: userId, ...newData });
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
        throw new ConflictException('Пользователь с таким username и email уже существует');
      }
      throw error;
    }
  }
}
