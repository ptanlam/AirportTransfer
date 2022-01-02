import { Test, TestingModule } from '@nestjs/testing';
import { BusesController } from './buses.controller';

describe('BusesController', () => {
  let controller: BusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusesController],
    }).compile();

    controller = module.get<BusesController>(BusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
