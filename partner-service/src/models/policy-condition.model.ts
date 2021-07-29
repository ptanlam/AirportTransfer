import { Model } from 'sequelize';

export class PolicyCondition extends Model {
  id: string;
  policyId: string;
  updatedAt: string;
  createdAt: string;
  isActive: boolean;
  lostPercentage: number;
}
