import { Model } from 'sequelize';

export class CarModel extends Model {
  id: string;
  name: string;
  luggagePayload: number;
  guestQuantity: number;
  partnerId: string;
  photoUrl: string;
  standardPricePerKm: number;
  isRegistered: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  country: string;
  city: string;
  classId: string;
}
