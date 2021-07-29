export class EditPolicyDTO {
  condition: string;
  lostPercentage: string;
  vehicleClass: {
    name: string;
    id: string;
  };

  constructor(
    condition: string,
    lostPercentage: string,
    vehicleClass: string,
    public policyId: string,
  ) {
    this.condition = condition === '' ? null : condition;
    this.lostPercentage = lostPercentage === '' ? null : lostPercentage;
    this.vehicleClass = vehicleClass === '' ? null : JSON.parse(vehicleClass);
  }
}
