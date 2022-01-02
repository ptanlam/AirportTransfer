import { Model } from 'sequelize';

export class Journey extends Model {
  id: string;
  isActive: boolean;
  busId: string;
  travelTime: string;
  createdAt: string;
  stillHasSchedule: boolean;
}
