import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { FilesService } from "src/utils/files/files.service";
import { TrainsController } from "./trains.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "TRAIN_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: "trains_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: "PARTNER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: "partners_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [FilesService],
  controllers: [TrainsController],
})
export class TrainsModule {}
