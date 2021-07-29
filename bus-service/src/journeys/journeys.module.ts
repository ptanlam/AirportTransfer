import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';

@Module({
  providers: [JourneysService],
  controllers: [JourneysController],
  exports: [JourneysService],
})
export class JourneysModule {}
