import { Model } from 'sequelize';

export class ExchangeTickets extends Model {
  id: string;
  oldTicketId: string;
  originalPrice: number;
  lostPercentage: number;
  refundAmount: number;
  newTicketId: string;
  createdAt: string;
  updatedAt: string;
}
