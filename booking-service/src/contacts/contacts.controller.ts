import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from '../dtos/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  private readonly logger = new Logger('ContactController');
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern('create_contact')
  async postContact(
    @Payload() createContactDto: CreateContactDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const contact = await this.contactsService.postContact(createContactDto);
      return { contact };
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
