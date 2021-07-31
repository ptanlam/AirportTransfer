import { Model } from 'sequelize';

export class ScheduleDetails extends Model {
  id: string;
  scheduleId: string;
  ticketCount: number;
  departAt: string;
  arrivalAt: string;
}
