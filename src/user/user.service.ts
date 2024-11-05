import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/services/encrypt.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
  private readonly bcryptService: BcryptService
){}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await this.bcryptService.hashPassword(createUserDto.password);
    const newUser = {...createUserDto, password: hashPassword}
    return await this.userRepository.save(newUser);
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    const entity = this.userRepository.findOne({where: {id}})
    return entity
  }

  async remove(id: string) {
    const userRemove = this.userRepository.delete({id})
    return userRemove
  }

  async findUserWithPassword(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password']
    });
  }
}
