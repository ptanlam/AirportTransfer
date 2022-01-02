import { Model } from 'sequelize';

export class Partner extends Model {
  id: string;
  name: string;
  email: string;
  hotline: string;
  transportType: string;
  logoUrl: string;
  presenterId: string;
  isActive: string;
  isRegistered: string;
  updatedAt: Date;
  createdAt: Date;
  classes: [
    {
      id: string;
      name: string;
      partnerId: string;
    },
  ];
  policies: [
    {
      id: string;
      type: string;
      classId: string;
      className: string;
      condition: string;
      lostPercentage: number;
    },
  ];
}
