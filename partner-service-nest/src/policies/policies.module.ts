import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService]
})
export class PoliciesModule {}
