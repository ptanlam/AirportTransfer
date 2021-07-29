import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmailService } from 'src/utils/email/email.service';
import { BookingController } from './booking.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'booking_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'PARTNERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'partners_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'BUSES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'buses_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'TRAINS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'trains_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'CARS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'cars_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'FLIGHT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'flights_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [EmailService],
})
export class BookingModule {}
