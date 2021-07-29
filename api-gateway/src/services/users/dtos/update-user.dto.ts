export class UpdateUserDTO {
  constructor(
    public firstName: string = null,
    public lastName: string = null,
    public phoneNumber: string = null,
  ) {}
}
