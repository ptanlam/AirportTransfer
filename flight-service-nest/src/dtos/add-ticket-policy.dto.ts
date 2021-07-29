export class AddTicketPolicyDTO {
  exchangePolicies: [
    {
      seatTypes: [{ title: string }];
      condition: string;
      lostPercentage: number;
    },
  ];
  cancellationPolicies: [
    {
      seatTypes: [{ title: string }];
      condition: string;
      lostPercentage: number;
    },
  ];
}
