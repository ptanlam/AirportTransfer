import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { ClassesService } from 'src/classes/classes.service';
import { PoliciesService } from 'src/policies/policies.service';

@Module({
  providers: [PartnersService, ClassesService, PoliciesService],
  controllers: [PartnersController],
})
export class PartnersModule {}
