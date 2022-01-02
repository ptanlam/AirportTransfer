import { Model } from 'sequelize';

export class JourneyDetails extends Model {
  id: string;
  orderNumber: number;
  description: string;
  placeId: string;
  district: string;
  city: string;
  country: string;
  journeyId: string;
}
