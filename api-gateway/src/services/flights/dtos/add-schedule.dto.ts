export class AddScheduleDTO {
  departureAt: string;
  arrivalAt: string;
  flightId: string;
  journeys: [
    {
      departureAt: string;
      arrivalAt: string;
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
