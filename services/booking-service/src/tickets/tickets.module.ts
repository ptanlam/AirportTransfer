import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, ContactsService],
})
export class TicketsModule {}
