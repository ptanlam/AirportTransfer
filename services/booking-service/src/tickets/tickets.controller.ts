import { Controller, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ContactsService } from 'src/contacts/contacts.service';
import { CreateTicketDto } from 'src/dtos/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger('TicketController');
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly contactsService: ContactsService,
  ) {}

  @MessagePattern('create_ticket')
  async createTicket(
    @Payload() createTicketDto: CreateTicketDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const {
      guests,
      contact,
      scheduleDetailId,
      totalPrice,
      captureId,
      vehicleType,
      classId,
      partnerId,
    } = createTicketDto;
    try {
      const contactTemp = await this.contactsService.postContact(contact);
      const ticketPrice = (totalPrice * 1.0) / guests.length;
      const tickets = await Promise.all(
        guests.map(async (guest) => {
          const ticket = await this.ticketsService.postTicket(
            scheduleDetailId,
            ticketPrice,
            vehicleType,
            captureId,
            classId,
            guest.title,
            guest.fullName,
            partnerId,
            contactTemp.id,
          );
          return ticket;
        }),
      );
      return {
        tickets,
        contactTemp,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_tickets_by_email')
  async getTicketByEmail(@Payload() email: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await this.ticketsService.getTicketsByEmail(email);
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_ticket_by_scheduleDetailId')
  async getTicketsByScheduleDetailId(
    @Payload() scheduleDetailId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await this.ticketsService.getTicketsByScheduleDetailId(
        scheduleDetailId,
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_number_of_tickets_by_partner')
  async getTicketByPartner(
    @Payload() data: { partnerId: string; year: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const numberOfTickets = await this.ticketsService.getNumberOfTicketsByPartner(
        data.partnerId,
        data.year,
      );
      return numberOfTickets;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_ticket_by_id')
  async getTicketById(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const ticket = await this.ticketsService.getTicketById(id);
      return ticket;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }
}
