import { Model } from 'sequelize';

export class Schedule extends Model {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  gap: string;
  numberOfVehicles: number;
  remainingTickets: number;
  numOfJourneys: number;
  journeyId: string;
}
