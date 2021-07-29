import { Model } from 'sequelize';

export class ScheduleDetails extends Model {
  id: string;
  scheduleId: string;
  departureAt: string;
  arrivalAt: string;
  iActive: boolean;
  isCancellable: boolean;
  isCancelled: boolean;
  canBeManipulated: boolean;
}
