import { Role } from 'aws-sdk/clients/budgets';

export class CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role?: Role;
}
