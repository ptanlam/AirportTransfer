import { Controller, Logger } from '@nestjs/common';
import { JourneysService } from './journeys.service';

@Controller('journeys')
export class JourneysController {
  private readonly logger = new Logger('JourneysController');

  constructor(private journeysService: JourneysService) {}
}
