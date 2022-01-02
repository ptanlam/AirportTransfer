import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';
import { ContactsModule } from './contacts/contacts.module';
import { TicketPoliciesModule } from './ticket-policies/ticket-policies.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    TicketsModule,
    ContactsModule,
    TicketPoliciesModule,
    PaymentModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class AppModule {}
