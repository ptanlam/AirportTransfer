import { Model } from 'sequelize';

export class Journey extends Model {
  id: string;
  departureAt: Date;
  arrivalAt: Date;
  createdAt: Date;
  updatedAt: Date;
  scheduleId: string;
}
