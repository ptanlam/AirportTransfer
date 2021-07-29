export class UpdateCarModelInformationDTO {
  name: string | null;
  luggagePayload: string | null;
  guestQuantity: string | null;
  oldPhotoKey: string;
  photoUrl: string | null = null;
  standardPricePerKm: string | null;
  country: string | null;
  city: string | null;
  classId: string | null;
  constructor(
    name: string,
    luggagePayload: string,
    guestQuantity: string,
    photoUrl: string,
    standardPricePerKm: string,
    country: string,
    city: string,
    classId: string,
  ) {
    this.name = name === '' ? null : name;
    this.luggagePayload = luggagePayload === '' ? null : luggagePayload;
    this.guestQuantity = guestQuantity === '' ? null : guestQuantity;
    this.photoUrl = photoUrl === '' ? null : photoUrl;
    this.standardPricePerKm =
      standardPricePerKm === '' ? null : standardPricePerKm;
    this.country = country === '' ? null : country;
    this.city = city === '' ? null : city;
    this.classId = classId === '' ? null : classId;
  }
}
