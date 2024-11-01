import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto)
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const entity = this.userRepository.findOne({where: {id}})
    return entity
  }

  async remove(id: string) {
    const userRemove = this.userRepository.delete({id})
    return userRemove
  }
}
