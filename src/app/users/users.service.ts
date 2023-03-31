import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async create(data: CreateUserDto) {
    return await this.userRepository.save(this.userRepository.create(data));
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email: email },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
