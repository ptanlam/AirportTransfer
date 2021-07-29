import { Model } from 'sequelize';

export class FilteredSchedule extends Model {
  remainingTickets: number;
  scheduleId: string;
}
