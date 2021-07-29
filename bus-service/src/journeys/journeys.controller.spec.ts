import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';

describe('JourneysController', () => {
  let controller: JourneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
