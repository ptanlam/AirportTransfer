export class EditPolicyDTO {
  condition: string | null;
  lostPercentage: string | null;
  vehicleClass: {
    name: string;
    id: string;
  } | null;
  policyId: string;
}
