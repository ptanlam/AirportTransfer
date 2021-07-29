import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GetSchedulesByConditionsDTO } from 'src/dtos/get-schedules-by-conditions.dto';
import { AddScheduleDTO } from '../dtos/add-schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  private readonly logger = new Logger('SchedulesController');

  constructor(private schedulesService: SchedulesService) {}

  @MessagePattern('get_schedule_by_journey_and_date')
  async getSchedulesByJourneyAndDate(
    @Payload() data: { journeyId: string; date: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const schedule = await this.schedulesService.getScheduleByJourneyAndDate(
        data.journeyId,
        data.date,
      );
      if (!schedule) return { schedule: { ...schedule, details: [] } };
      const details = await this.schedulesService.getScheduleDetailsBySchedule(
        schedule.id,
      );
      return { schedule: { ...schedule, details } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('manipulate_schedule_details')
  async manipulateScheduleDetails(
    @Payload()
    data: {
      scheduleDetailId: string;
      type: string;
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const scheduleDetails = await this.schedulesService.manipulateScheduleDetails(
        data.scheduleDetailId,
        data.type,
      );
      return { detail: scheduleDetails };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('add_schedule')
  async addSchedule(
    @Payload() addScheduleDTO: AddScheduleDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const details = await this.schedulesService.addSchedule(addScheduleDTO);
      const schedule = await this.schedulesService.getScheduleById(
        details[0].id,
      );
      return { schedule: { ...schedule, details } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_full_ticket_information')
  async getTicketInformation(
    @Payload() scheduleDetailId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const ticketInformation = await this.schedulesService.getTicketInformation(
        scheduleDetailId,
      );
      return ticketInformation;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('cancel_schedule_detail')
  async cancelScheduleDetail(
    @Payload() scheduleDetailId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const detail = await this.schedulesService.cancelScheduleDetail(
        scheduleDetailId,
      );
      return { detail };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('revoke_tickets')
  async revokeTickets(
    @Payload() data: { scheduleDetailId: string; numberOfTickets: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.schedulesService.revokeTickets(
        data.scheduleDetailId,
        data.numberOfTickets,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_schedule_details_by_partner_and_conditions')
  async getScheduleDetailsByPartnerAndConditions(
    @Payload()
    data: {
      partnerId: string;
      getSchedulesByConditionsDTO: GetSchedulesByConditionsDTO;
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const tickets = await this.schedulesService.getScheduleDetailsByPartnerAndConditions(
        data.partnerId,
        data.getSchedulesByConditionsDTO,
      );
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
