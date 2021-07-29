export class AddScheduleDTO {
  departureAt: Date;
  arrivalAt: Date;
  flightId: string;
  journeys: [
    {
      departureAt: Date;
      arrivalAt: Date;
      scheduleId: string;
      stations: [
        {
          description: string;
          placeId: string;
          district: string;
          city: string;
          country: string;
        },
      ];
    },
  ];
}
