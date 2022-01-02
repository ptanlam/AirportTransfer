import { Module } from '@nestjs/common';
import { JourneysService } from '../journeys/journeys.service';
import { SchedulesService } from '../schedules/schedules.service';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';

@Module({
  providers: [BusesService, SchedulesService, JourneysService],
  controllers: [BusesController],
})
export class BusesModule {}
