import { Model } from 'sequelize';

export class Schedule extends Model {
  id: string;
  departureAt: Date;
  arrivalAt: Date;
  createdAt: Date;
  updatedAt: Date;
  flightId: string;
  isActive: boolean;
  isCancelled: boolean;
}
