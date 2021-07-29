export class GetSchedulesByConditionsDTO {
  date: Date;
  seatType: string;
  depCity: string;
  depCountry: string;
  desCity: string;
  desCountry: string;
  isRoundTrip?: string;
  returnDate?: string;
  numberOfPax?: number;
  partnerId?: string;
}
