import { RegisterStationDTO } from './register-station.dto';

export class RegisterJourneyDTO {
  vehicleId: string;
  travelTime: string;
  stations: RegisterStationDTO[];
}
