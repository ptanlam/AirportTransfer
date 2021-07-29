export class SchedulesDTO {
  cars: [];
  date: string;
  start: string;
  travel: number;
  details: JourneysDTO[];
}

export class JourneysDTO {
  placeId: string;
  district: string;
  city: string;
  country: string;
  orderNumber: number;
  scheduleId: string;
  description: string;
}
