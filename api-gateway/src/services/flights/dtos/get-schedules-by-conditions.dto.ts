export class GetSchedulesByConditionsDTO {
  date: Date;
  seatType: string;
  depCity: string;
  depCountry: string;
  desCity: string;
  desCountry: string;
  isRoundtrip?: string;
  returnDate?: string;
  numberOfPax?: number;
  partnerId?: string;
}
