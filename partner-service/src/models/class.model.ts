import { Model } from 'sequelize';

export class Class extends Model {
  id: string;
  name: string;
  partnerId: string;
}
