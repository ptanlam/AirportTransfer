import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SchedulesDTO } from '../dtos/add-schedules.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  private readonly logger = new Logger('SchedulesController');

  constructor(private readonly schedulesService: SchedulesService) {}

  @MessagePattern('get_schedules_by_car_and_date')
  async getSchedulesByCarAndDate(
    @Payload() data: { carId: string; date: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const schedules = await this.schedulesService.getSchedulesByCarDate(
        data.carId,
        data.date,
      );

      const journeys = await Promise.all(
        schedules.map(async (schedule) => {
          const details = await this.schedulesService.getJourneys(schedule.id);
          return { ...schedule, details };
        }),
      );
      return { schedules: journeys };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('add_schedule')
  async addSchedule(
    @Payload() schedulesDTO: SchedulesDTO,
    @Ctx() context: RmqContext,
  ) {
    const { details, cars } = schedulesDTO;
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const schedule = await this.schedulesService.addSchedule(schedulesDTO);
      const insertedCars = await Promise.all(
        cars.map(async (car) => {
          const insertedCar = this.schedulesService.addScheduleDetail(
            car,
            schedule.id,
          );
          return insertedCar;
        }),
      );
      const journeys = await Promise.all(
        details.map(async (detail) => {
          const insertedJourney = await this.schedulesService.addJourney(
            detail,
            schedule.id,
          );
          return insertedJourney;
        }),
      );
      return {
        ...schedule,
        cars: insertedCars,
        details: journeys,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('remove_schedule_booked')
  async removeScheduleBooked(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.schedulesService.removeScheduleCompletely(scheduleId);
      return { message: `Removing schedule ${scheduleId} completely` };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('cancel_schedule_booked')
  async cancelScheduleBooked(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.schedulesService.cancelScheduleBooked(scheduleId);
      return { message: `Canceling schedule ${scheduleId} completely` };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('activate_schedule_booked')
  async activateScheduleBooked(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.schedulesService.activateScheduleBooked(scheduleId);
      return { message: `Activated schedule ${scheduleId} completely` };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
