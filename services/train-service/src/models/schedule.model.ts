import { Model } from 'sequelize';

export class Schedule extends Model {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  travelTime: string;
  gap: string;
  remainingTickets: number;
  numOfJourneys: number;
  journeyId: string;
}
