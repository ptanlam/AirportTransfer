import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { ExchangeTicketDto } from 'src/dtos/create-exchange-ticket.dtos';
import { CancellationTickets } from 'src/models/cancellationTickets.model';
import { CancellationTicketDto } from '../dtos/create-cancel-ticket.dtos';

@Injectable()
export class TicketPoliciesService {
  private readonly logger = new Logger('TicketPolicesService');
  constructor(private sequelize: Sequelize) {}

  async createCancellationTicket(cancellationTicketDto: CancellationTicketDto) {
    try {
      const cancellationTicket = await this.sequelize.query(
        'SP_CreateCancellationTicket @oldTicketId=:oldTicketId,' +
          ' @lostPercentage=:lostPercentage',
        {
          replacements: {
            oldTicketId: cancellationTicketDto.oldTicketId,
            lostPercentage: cancellationTicketDto.lostPercentage,
          },
          type: QueryTypes.SELECT,
          mapToModel: true,
          model: CancellationTickets,
          raw: true,
        },
      );
      return cancellationTicket[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async createExchangeTicket(exchangeTicketDto: ExchangeTicketDto) {
    try {
      const exchangeTicket = await this.sequelize.query(
        'SP_CreateExchangeTicket @oldTicketId=:oldTicketId, @lostPercentage=:lostPercentage, @newTicketId=:newTicketId',
        {
          replacements: {
            oldTicketId: exchangeTicketDto.oldTicketId,
            lostPercentage: exchangeTicketDto.lostPercentage,
            newTicketId: exchangeTicketDto.newTicketId,
          },
          raw: true,
        },
      );
      return exchangeTicket;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
