import { Model } from 'sequelize';

export class Ticket extends Model {
  id: string;
  journeyId: string;
  price: number;
  seatPosition: string;
  seatType: string;
  isBooked: boolean;
}
