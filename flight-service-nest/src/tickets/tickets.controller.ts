import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddTicketDTO } from 'src/dtos/add-tickets.dto';
import { GetTicketsForBookingDTO } from 'src/dtos/get-ticket-for-booking.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  private readonly logger = new Logger('TicketsController');

  constructor(private ticketsService: TicketsService) {}

  @MessagePattern('get_booked_tickets_by_schedule')
  async getBookedTicketsBySchedule(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await this.ticketsService.getBookedTicketsBySchedule(
        scheduleId,
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('add_tickets')
  async addTickets(
    @Payload() addTicketDTOs: AddTicketDTO[],
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await Promise.all(
        addTicketDTOs.map(async (addTicketDTO) => {
          const ticket = await this.ticketsService.addTickets(addTicketDTO);
          return ticket;
        }),
      );
      return { tickets };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_tickets_for_booking')
  async getTicketsForBooking(
    @Payload()
    data: {
      bookingDetails: GetTicketsForBookingDTO;
      scheduleId: string;
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await this.ticketsService.getTicketsForBooking(
        data.bookingDetails,
        data.scheduleId,
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('revoke_ticket')
  async revokeTicket(@Payload() ticketId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.ticketsService.revokeTicket(ticketId);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
