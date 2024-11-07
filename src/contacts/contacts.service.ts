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

  async createContact(createContactDto: CreateContactDto, user: ActiveUserInterface): Promise<Contact> {
    
    const contact = this.contactRepository.create({
      ...createContactDto,
      user: { id: user.id }
    })

    return await this.contactRepository.save(contact);
  }

  async createContactArray(contacts: CreateContactDto[], user: ActiveUserInterface): Promise<Contact[]> {
    const createdContacts = await Promise.all(
      contacts.map((contactDto) => this.createContact(contactDto, user)),
    )
    return createdContacts
  }

  async findAll(user: ActiveUserInterface) {
    return await this.contactRepository.find({where: {user: { id: user.id }}});
  }

  async findOne(id: string, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where : {user: {id: user.id}}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where: {user: {id: user.id}}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    return await this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string, user: ActiveUserInterface) {
    const contact = await this.contactRepository.findOne({ where: {user: {id: user.id}}});

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found`);
    }

    await this.contactRepository.delete(id);
  }
}
