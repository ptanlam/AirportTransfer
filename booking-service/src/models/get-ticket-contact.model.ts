import { Model } from 'sequelize';
import { vehicleType } from 'src/enums/vehicleType.enum';

export class TicketContact extends Model {
  id: string;
  scheduleDetailId: string;
  totalPrice: number;
  captureId: string;
  vehicleType: vehicleType;
  createdAt: string;
  updatedAt: string;
  contactFullName: string;
  phoneNumber: string;
  email: string;
}
