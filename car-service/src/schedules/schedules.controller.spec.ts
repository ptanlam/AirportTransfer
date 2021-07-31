import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from '../schedules/schedules.controller';

describe('SchedulesController', () => {
  let schedulesController: SchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
    }).compile();

    schedulesController = module.get<SchedulesController>(SchedulesController);
  });
});
