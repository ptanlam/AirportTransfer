import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';

@Module({
  providers: [JourneysService],
  controllers: [JourneysController]
})
export class JourneysModule {}
