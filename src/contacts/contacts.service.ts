import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/activeUSer.interface';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>){}

  private validateOwner(userId: string, user: ActiveUserInterface){
    if(userId !== user.id){
      throw new UnauthorizedException('You are not authorized to perform this action');
    }
  }

  async create(createContactDto: CreateContactDto, user: ActiveUserInterface) {
    this.validateOwner(createContactDto.userId, user)

    return await this.contactRepository.save(createContactDto);
  }

  async findAll(user: ActiveUserInterface) {
    return await this.contactRepository.find({where: {userId: user.id}});
  }

  async findOne(id: string, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where : {userId: id}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    this.validateOwner(contact.userId, user);

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where: {userId: id}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    this.validateOwner(contact.userId, user);

    return await this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where: {userId: id}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    this.validateOwner(contact.userId, user);

    await this.contactRepository.delete(id);
  }
}
