import { vehicleType } from 'src/common/enums/vehicleType.enum';
import { CreateContactDto } from './create-contact.dto';
import { CreateGuestDto } from './create-guest.dto';
export class CreateTicketDto {
  scheduleDetailId: string[];
  totalPrice: number;
  contact: CreateContactDto;
  vehicleType: vehicleType;
  captureId?: string;
  classId: string;
  partnerId: string;
  guests: CreateGuestDto[];
}
