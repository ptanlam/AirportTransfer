import { Model } from 'sequelize';
import { vehicleType } from 'src/enums/vehicleType.enum';

export class Ticket extends Model {
  id: string;
  scheduleDetailId: string;
  ticketPrice: number;
  captureId: string;
  vehicleType: vehicleType;
  classId: string;
  title: string;
  fullName: string;
  partnerId: string;
  contactId: string;
  createdAt: string;
  updatedAt: string;
}
