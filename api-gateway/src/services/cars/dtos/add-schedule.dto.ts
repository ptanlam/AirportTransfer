export class AddScheduleDTO {
  cars: [{ id: string }];
  date: string;
  start: string;
  travel: number;
  details: [
    {
      placeId: string;
      district: string;
      city: string;
      country: string;
      orderNumber: number;
      description: string;
    },
  ];
}
