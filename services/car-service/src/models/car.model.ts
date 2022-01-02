import { Model } from 'sequelize';

export class Car extends Model {
  id: string;
  licencePlate: string;
  color: string;
  carModelId: string;
}
