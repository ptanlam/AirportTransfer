import { Model } from 'sequelize';

export class Flight extends Model {
  id: string;
  name: string;
  partnerId: string;
  guestQuantity: number;
  numberOfAircraft: number;
  photoUrl: string;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
