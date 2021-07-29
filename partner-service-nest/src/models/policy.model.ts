import { Model } from 'sequelize';

export class Policy extends Model {
  id: string;
  type: string;
  classId: string;
  updatedAt: string;
  createdAt: string;
  condition: string;
  lostPercentage: string;
}
