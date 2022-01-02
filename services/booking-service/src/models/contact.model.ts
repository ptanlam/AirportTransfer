import { Model } from 'sequelize';

export class Contact extends Model {
  id: string;
  contactFullName: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
