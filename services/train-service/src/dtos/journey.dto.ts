import { RegisterStationDTO } from './station.dto';

export class RegisterJourneyDTO {
  vehicleId: string;
  travelTime: string;
  stations: RegisterStationDTO[];
}
