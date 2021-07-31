import { CreateContactDto } from './create-contact.dto';
import { CreateGuestDto } from './create-guest.dto';
export class CreateTicketDto {
  scheduleDetailId: string;
  totalPrice: number;
  vehicleType: string;
  captureId: string;
  classId: string;
  partnerId: string;
  contact: CreateContactDto;
  guests: CreateGuestDto[];
}
