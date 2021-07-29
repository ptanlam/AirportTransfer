import { Model } from 'sequelize';

export class FilteredSchedule extends Model {
  scheduleId: string;
  journeyId: string;
}
