import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(AppGateway.name);

  announceToPartner(partnerId: string) {
    this.server.emit(`announceToPartner#${partnerId}`, {
      activatedPartnerId: partnerId,
      message: 'Your registration form has been approved!',
    });
  }
}
