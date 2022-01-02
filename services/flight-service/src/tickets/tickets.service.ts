import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { AddTicketDTO } from 'src/dtos/add-tickets.dto';
import { GetTicketsForBookingDTO } from 'src/dtos/get-ticket-for-booking.dto';
import { Ticket } from 'src/models/ticket.model';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger('TicketsService');

  constructor(private sequelize: Sequelize) {}

  async getTicketsBySchedule(scheduleId: string): Promise<Ticket[]> {
    try {
      const tickets = await this.sequelize.query(
        'SP_GetTicketsBySchedule @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return tickets;
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }

  async getBookedTicketsBySchedule(scheduleId: string): Promise<Ticket[]> {
    try {
      const tickets = await this.sequelize.query(
        'SP_GetBookedTicketsBySchedule @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return tickets;
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }

  async addTickets(addTicketsDTO: AddTicketDTO): Promise<Ticket> {
    try {
      const ticket = await this.sequelize.query(
        'SP_AddTickets @scheduleId=:scheduleId, @price=:price, ' +
          '@seatPosition=:seatPosition, @seatType=:seatType',
        {
          type: QueryTypes.SELECT,
          replacements: {
            scheduleId: addTicketsDTO.scheduleId,
            price: addTicketsDTO.price,
            seatPosition: addTicketsDTO.seatPosition,
            seatType: addTicketsDTO.seatType,
          },
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return ticket[0];
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketPriceByScheduleAndSeatType(
    scheduleId: string,
    seatType: string,
  ) {
    try {
      const record = await this.sequelize.query(
        'SP_GetTicketPriceByScheduleAndSeatType @scheduleId=:scheduleId, ' +
          '@seatType=:seatType',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId, seatType },
          raw: true,
        },
      );
      return record[0]['price'];
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketsForBooking(
    bookingDetails: GetTicketsForBookingDTO,
    scheduleId: string,
  ): Promise<Ticket[]> {
    try {
      const tickets = await this.sequelize.query(
        'SP_GetTicketsForBooking @scheduleId=:scheduleId, ' +
          '@seatType=:seatType, @numberOfTickets=:numberOfTickets',
        {
          type: QueryTypes.SELECT,
          replacements: {
            scheduleId,
            seatType: bookingDetails.seatType,
            numberOfTickets: bookingDetails.numberOfTickets,
          },
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return tickets;
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }

  async revokeTicket(ticketId: string) {
    try {
      const result = await this.sequelize.query(
        'SP_RevokeTicket @ticketId=:ticketId',
        {
          type: QueryTypes.UPDATE,
          replacements: { ticketId },
        },
      );
      return result;
    } catch (error) {
      this.logger.log(error.message);
      throw new DatabaseError(error);
    }
  }
}
