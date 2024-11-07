import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../common/decorators/activeUser.decorator';
import { ActiveUserInterface } from 'src/common/interface/activeUSer.interface';
import { CreateContactsDto } from './dto/arrayContactsDto';
import { Contact } from './entities/contact.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Contact')
@UseGuards(AuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.createContact(createContactDto, user);
  }

  @Post()
  async createMultipleContacts(@Body() createContactsDto: CreateContactsDto, @ActiveUser() user: ActiveUserInterface): Promise<Contact[]>{
    return this.contactsService.createContactArray(createContactsDto.contacts, user);
  }

  @Get()
  async findAll(@ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.findAll(user);
  }

  @Get(':id')
  async findContactByUserId(@Param('id') userId: string, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.findOne(userId, user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.update(id, updateContactDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return await this.contactsService.remove(id, user);
  }
}
