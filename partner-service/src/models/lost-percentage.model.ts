import { Model } from 'sequelize';

export class LostPercentage extends Model {
  id: string;
  policyId: string;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  lostPercentage: number;
}
