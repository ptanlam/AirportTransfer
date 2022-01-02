import { Test, TestingModule } from '@nestjs/testing';
import { TicketPoliciesService } from './ticket-policies.service';

describe('TicketPoliciesService', () => {
  let service: TicketPoliciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketPoliciesService],
    }).compile();

    service = module.get<TicketPoliciesService>(TicketPoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
