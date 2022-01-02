import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddPolicyDTO } from 'src/dtos/add-policy.dto';
import { EditPolicyDTO } from 'src/dtos/edit-policy.dto';
import { GetPolicyByConditionsDTO } from 'src/dtos/get-policy-by-conditions.dto';
import { PoliciesService } from './policies.service';

@Controller('policies')
export class PoliciesController {
  private readonly logger = new Logger('PoliciesController');

  constructor(private policiesService: PoliciesService) {}

  @MessagePattern('add_policy')
  async postPolicy(
    @Payload()
    data: { policy: AddPolicyDTO; policyType: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const policy = await this.policiesService.addPolicy(
        data.policyType,
        data.policy.classId,
        data.policy.condition,
        data.policy.lostPercentage,
      );
      return { policy };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('edit_policy')
  async patchPolicy(
    @Payload() editPolicyDTO: EditPolicyDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const policy = await this.policiesService.editPolicy(editPolicyDTO);
      return { policy };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('remove_policy')
  async deletePolicy(@Payload() policyId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const policy = await this.policiesService.removePolicy(policyId);
      return { policy };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_policy_by_conditions')
  async getPolicyByConditions(
    @Payload() getPolicyByConditions: GetPolicyByConditionsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const policy = await this.policiesService.getPolicyByConditions(
        getPolicyByConditions,
      );
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
