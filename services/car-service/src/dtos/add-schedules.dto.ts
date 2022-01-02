import { ScheduleDetailsDTO } from './add-cars-scheduleDetails.dto';
import { JourneysDTO } from './add-journeys.dto';

export class SchedulesDTO {
  date: string;
  start: string;
  travel: number;
  cars: ScheduleDetailsDTO[];
  details: JourneysDTO[];
}
