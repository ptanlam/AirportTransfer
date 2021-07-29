export class EditFlightDTO {
  name: string | null;
  guestQuantity: string | null;
  oldPhotoKey: string;
  photoUrl: string | null = null;

  constructor(name: string, guestQuantity: string, photoUrl: string) {
    this.name = name === '' ? null : name;
    this.guestQuantity = guestQuantity === '' ? null : guestQuantity;
    this.photoUrl = photoUrl === '' ? null : photoUrl;
  }
}
