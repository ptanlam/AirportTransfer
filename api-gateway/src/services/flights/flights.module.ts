import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FilesService } from 'src/utils/files/files.service';
import { FlightsController } from './flights.controller';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
  ],
  providers: [FilesService],
  controllers: [FlightsController],
})
export class FlightsModule {}
