export class EditBusDTO {
  name: string | null;
  guestQuantity: string | null;
  ticketPrice: string | null;
  oldPhotoKey: string;
  photoUrl: string | null = null;
  classId: string | null;

  constructor(
    name: string,
    guestQuantity: string,
    ticketPrice: string,
    photoUrl: string,
    classId: string,
  ) {
    this.name = name === '' ? null : name;
    this.guestQuantity = guestQuantity === '' ? null : guestQuantity;
    this.ticketPrice = ticketPrice === '' ? null : ticketPrice;
    this.photoUrl = photoUrl === '' ? null : photoUrl;
    this.classId = classId === '' ? null : classId;
  }
}
