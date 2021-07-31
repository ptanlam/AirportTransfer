import { Test, TestingModule } from '@nestjs/testing';
import { TicketPoliciesController } from './ticket-policies.controller';
import { TicketPoliciesService } from './ticket-policies.service';

describe('TicketPoliciesController', () => {
  let controller: TicketPoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketPoliciesController],
      providers: [TicketPoliciesService],
    }).compile();

    controller = module.get<TicketPoliciesController>(TicketPoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
