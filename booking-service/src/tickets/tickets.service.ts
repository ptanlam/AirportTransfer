import { Injectable, Logger } from '@nestjs/common';
import { raw } from 'express';
import { DatabaseError, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { TicketContact } from 'src/models/get-ticket-contact.model';
import { Ticket } from '../models/ticket.model';
import { TicketDetail } from './ticketDetail.model';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger('TicketService');
  constructor(private sequelize: Sequelize) {}

  async postTicket(
    scheduleDetailId: string,
    ticketPrice: number,
    vehicleType: string,
    captureId: string,
    classId: string,
    title: string,
    fullName: string,
    partnerId: string,
    contactId: string,
  ) {
    try {
      const ticket = await this.sequelize.query(
        `SP_CreateTicket @scheduleDetailId=:scheduleDetailId, ` +
          `@ticketPrice=:ticketPrice, @vehicleType=:vehicleType, @captureId=:captureId, ` +
          `@classId=:classId, @title=:title, @fullName=:fullName, @partnerId=:partnerId, @contactId=:contactId `,
        {
          replacements: {
            scheduleDetailId: scheduleDetailId,
            ticketPrice: ticketPrice,
            vehicleType: vehicleType,
            captureId: captureId,
            classId: classId,
            title: title,
            fullName: fullName,
            partnerId: partnerId,
            contactId: contactId,
          },
          type: QueryTypes.SELECT,
          mapToModel: true,
          model: Ticket,
          raw: true,
        },
      );
      return ticket[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketsByScheduleDetail(scheduleDetailId: string) {
    try {
      const tickets = await this.sequelize.query(
        'SP_GetTicketsByScheduleDetail @scheduleDetailId=:scheduleDetailId',
        {
          replacements: { scheduleDetailId },
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async postTicketsDetail(ticketId: string, contactId: string) {
    try {
      await this.sequelize.query(
        'SP_CreateTicketDetail @ticketId=:ticketId, @contactId=:contactId',
        {
          replacements: {
            ticketId: ticketId,
            contactId: contactId,
          },
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: TicketDetail,
        },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketsByEmail(email: string) {
    try {
      const tickets = await this.sequelize.query(
        'SP_GetTicketsByEmail @email=:email',
        {
          replacements: { email },
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: Ticket,
        },
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketsByScheduleDetailId(scheduleDetailId: string) {
    try {
      const ticketContacts = await this.sequelize.query(
        'SP_GetTicketsByScheduleDetailId @scheduleDetailId=:scheduleDetailId',
        {
          replacements: { scheduleDetailId },
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: TicketContact,
        },
      );
      return ticketContacts;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getNumberOfTicketsByPartner(partnerId: string, year: string) {
    try {
      const numberOfTickets = await this.sequelize.query(
        'SP_GetNumberOfTicketsByPartner @partnerId=:partnerId, @year=:year',
        {
          replacements: { partnerId: partnerId, year: year },
          type: QueryTypes.SELECT,
          raw: true,
        },
      );
      return numberOfTickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketById(id: string) {
    try {
      const ticket = await this.sequelize.query('SP_GetTicketById @id=:id', {
        replacements: { id: id },
        type: QueryTypes.SELECT,
        raw: true,
        mapToModel: true,
        model: Ticket,
      });
      return ticket[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
