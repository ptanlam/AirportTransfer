import { Model } from 'sequelize';

export class Schedules extends Model {
  id: string;
  date: Date;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isCancelled: boolean;
}
