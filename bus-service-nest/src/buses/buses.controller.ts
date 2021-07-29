import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BookBusDTO } from '../dtos/book-bus.dto';
import { EditBusDTO } from '../dtos/edit-bus.dto';
import { GetSchedulesByConditionsDTO } from '../dtos/get-schedules-by-conditions.dto';
import { RegisterBusDTO } from '../dtos/register-bus.dto';
import { JourneysService } from '../journeys/journeys.service';
import { SchedulesService } from '../schedules/schedules.service';
import { BusesService } from './buses.service';

@Controller('buses')
export class BusesController {
  private readonly logger = new Logger('BusesController');

  constructor(
    private busesService: BusesService,
    private schedulesService: SchedulesService,
    private journeysService: JourneysService,
  ) {}

  @MessagePattern('get_buses_by_partner')
  async getBusesByPartner(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const buses = await this.busesService.getBusesByPartner(partnerId);
      return { buses };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_buses_by_conditions')
  async getBusesByConditions(
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
          const bus = await this.busesService.getBusByJourney(
            schedule.journeyId,
          );
          const { partnerId, ...busInformation } = bus;
          const options = await this.schedulesService.getScheduleDetailsBySchedule(
            schedule.scheduleId,
            getSchedulesByConditionsDTO.pickUpTime,
          );
          return {
            ...schedule,
            partnerId,
            bus: busInformation,
            stations,
            options,
          };
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

  @MessagePattern('register_bus')
  async postBus(
    @Payload() registerBusDTO: RegisterBusDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const bus = await this.busesService.registerBus(registerBusDTO);
      return bus;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('update_bus')
  async patchBus(
    @Payload() editBusDTO: EditBusDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const bus = await this.busesService.updateBusInformation(editBusDTO);
      return bus;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('book_bus')
  async bookBus(@Payload() bookBusDTO: BookBusDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.busesService.bookBus(bookBusDTO);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('unregister_bus')
  async unregisterBus(@Payload() busId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.busesService.unregisterBus(busId);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
