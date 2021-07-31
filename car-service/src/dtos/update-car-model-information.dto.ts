export class UpdateCarModelInformationDTO {
  vehicleId: string;
  name: string | null;
  luggagePayload: number | null;
  guestQuantity: number | null;
  photoUrl: string | null;
  standardPricePerKm: number | null;
  country: string | null;
  city: string | null;
  classId: string | null;
}
