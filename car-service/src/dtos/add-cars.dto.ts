export class AddCarsDTO {
  cars: [AddCarDTO];
  carModelId: string;
}

export class AddCarDTO {
  licencePlate: string;
  color: string;
}
