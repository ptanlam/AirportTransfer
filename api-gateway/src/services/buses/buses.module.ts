import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FilesService } from 'src/utils/files/files.service';
import { BusesController } from './buses.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BUS_SERVICE',
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
  controllers: [BusesController],
})
export class BusesModule {}
