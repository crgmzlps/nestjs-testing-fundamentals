import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async all() {
    return this.userRepository.find();
  }
  async create(data) {
    return this.userRepository.save(data);
  }
  async update(id: number, data) {
    return this.userRepository.update(id, data);
  }
  async findOne(id) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
