import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FilesService } from 'src/utils/files/files.service';

import { CarsController } from './cars.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAR_SERVICE',
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
        name: 'PARTNER_SERVICE',
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
    ]),
  ],
  providers: [FilesService],
  controllers: [CarsController],
})
export class CarsModule {}
