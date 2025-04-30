import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(dto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(dto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === '23505') {
        throw new ConflictException('Пользователь с таким email уже существует');
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

  async update(...params: Parameters<typeof this.userRepository.update>) {
    return await this.userRepository.update(...params);
  }

  async save(...params: Parameters<typeof this.userRepository.save>) {
    return await this.userRepository.save(...params);
  }
}
