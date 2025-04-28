import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(dto: CreateUserDto) {
    this.userRepository.create(dto);
  }

  findOne(username: string) {
    return this.userRepository.findOneBy({ username });
  }
}
