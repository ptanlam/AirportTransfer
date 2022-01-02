import { Model } from 'sequelize';

export class TicketDetail extends Model {
  id: string;
  ticketId: string;
  guestId: string;
  contactId: string;
}
