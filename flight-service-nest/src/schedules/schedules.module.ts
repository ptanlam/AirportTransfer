import { Module } from '@nestjs/common';
import { JourneysService } from 'src/journeys/journeys.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, JourneysService, TicketsService],
})
export class SchedulesModule {}
