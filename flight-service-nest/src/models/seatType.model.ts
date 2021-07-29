import { Model } from 'sequelize';

export class SeatType extends Model {
  id: string;
  name: string;
  partnerId: string;
}
