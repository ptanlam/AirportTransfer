import { Model } from 'sequelize';

export class Bus extends Model {
  id: string;
  name: string;
  guestQuantity: number;
  photoUrl: string;
  ticketPrice: number;
  partnerId: string;
  createdAt: Date;
  updatedAt: Date;
  classId: string;
}
