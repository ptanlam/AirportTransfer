import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GetSchedulesByConditionsDTO } from '../dtos/get-schedules-by-conds.dto';
import { TrainDTO } from '../dtos/train.dto';
import { UpdateTrainDTO } from '../dtos/update-train.dto';
import { JourneysService } from '../journeys/journeys.service';
import { SchedulesService } from '../schedules/schedules.service';
import { TrainService } from './train.service';
@Controller('Trains')
export class TrainController {
  private readonly logger = new Logger('TrainController');
  constructor(
    private trainService: TrainService,
    private schedulesService: SchedulesService,
    private journeysService: JourneysService,
  ) {}

  @MessagePattern('get_trains_by_partner')
  async getTrainsByPartner(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const trains = await this.trainService.getTrainsByPartner(partnerId);
      return { trains };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('post_train')
  async postTrain(@Payload() trainDTO: TrainDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const train = await this.trainService.registerTrain(trainDTO);
      return train;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_trains_by_conditions')
  async getTrainsByConditions(
    @Payload() getSchedulesByConditionsDTO: GetSchedulesByConditionsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const filteredSchedules = await this.schedulesService.getSchedulesByConditions(
        getSchedulesByConditionsDTO,
      );
      if (!filteredSchedules) return filteredSchedules;
      const schedules = await Promise.all(
        filteredSchedules.map(async (schedule) => {
          const stations = await this.journeysService.getJourneyDetailsByJourney(
            schedule.journeyId,
          );
          const train = await this.trainService.getTrainByJourney(
            schedule.journeyId,
          );
          const options = await this.schedulesService.getScheduleDetailsBySchedule(
            schedule.scheduleId,
            getSchedulesByConditionsDTO.pickUpTime,
          );
          return { ...schedule, train, stations, options };
        }),
      );
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('patch_train')
  async patchTrain(
    @Payload() trainUpdateDTO: UpdateTrainDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const train = await this.trainService.updateTrainInformation(
        trainUpdateDTO,
      );
      return train;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('unregister_train')
  async unregisterTrain(
    @Payload() vehicleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.trainService.unregisterTrain(vehicleId);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_full_ticket_information')
  async getTicketFullInformation(
    @Payload() scheduleDetailId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const ticketFullInformation = this.trainService.getTicketInformation(
        scheduleDetailId,
      );
      return ticketFullInformation;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
