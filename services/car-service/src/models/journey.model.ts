import { Model } from 'sequelize';

export class Journeys extends Model {
  id: string;
  placeId: string;
  district: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: number;
  description: string;
  scheduleId: string;
}
