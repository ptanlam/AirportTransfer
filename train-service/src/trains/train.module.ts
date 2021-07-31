import { Module } from '@nestjs/common';
import { JourneysService } from '../journeys/journeys.service';
import { SchedulesService } from '../schedules/schedules.service';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

@Module({
  controllers: [TrainController],
  providers: [TrainService, SchedulesService, JourneysService],
})
export class TrainModule {}
