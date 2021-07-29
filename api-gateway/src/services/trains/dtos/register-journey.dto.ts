import { RegisterStationDTO } from 'src/common/dtos/register-station.dto';

export class RegisterJourneyDTO {
  vehicleId: string;
  travelTime: string;
  stations: RegisterStationDTO[];
}
