import { Model } from 'sequelize';

export class CancellationTickets extends Model {
  id: string;
  oldTicketId: string;
  originalPrice: number;
  lostPercentage: number;
  refundAmount: number;
  captureId: string;
  createdAt: string;
  updatedAt: string;
}
