import { TransportType } from 'src/common/enums/transport-type.enum';

export class CreatePartnerDTO {
  email: string;
  password: string;
  companyName: string;
  companyEmail: string;
  companyHotline: string;
  presenterLastName: string;
  presenterFirstName: string;
  presenterPhoneNumber: string;
  transportType: TransportType;
}
