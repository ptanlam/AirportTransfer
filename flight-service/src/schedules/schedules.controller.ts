import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddJourneyDetailsDTO } from 'src/dtos/add-journey-details.dto';
import { AddScheduleDTO } from 'src/dtos/add-schedule.dto';
import { GetSchedulesByConditionsDTO } from 'src/dtos/get-schedules-by-conditions.dto';
import { JourneysService } from 'src/journeys/journeys.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  private readonly logger = new Logger('SchedulesController');

  constructor(
    private schedulesService: SchedulesService,
    private journeysService: JourneysService,
    private ticketsService: TicketsService,
  ) {}

  async getJourneysAndDetails(scheduleId: string) {
    try {
      const journeys = await this.journeysService.getJourneysBySchedule(
        scheduleId,
      );
      const journeyDetails = await Promise.all(
        journeys.map(async (journey) => {
          const stations = await this.journeysService.getJourneyDetailsByJourney(
            journey.id,
          );
          return { ...journey, stations };
        }),
      );
      return journeyDetails;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @MessagePattern('get_schedules_by_flight_and_date')
  async getSchedulesByFlightAndDate(
    @Payload() data: { vehicleId: string; date: Date },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const schedules = await this.schedulesService.getSchedulesByFlightAndDate(
        data.vehicleId,
        data.date,
      );
      if (!schedules) return { schedules };
      const details = await Promise.all(
        schedules.map(async (schedule) => {
          const journeys = await this.getJourneysAndDetails(schedule.id);
          const tickets = await this.ticketsService.getTicketsBySchedule(
            schedule.id,
          );
          return { ...schedule, journeys, tickets };
        }),
      );

      return { schedules: details };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_schedules_by_conditions')
  async getSchedulesByCondition(
    @Payload() getScheduleByConditionsDTO: GetSchedulesByConditionsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      let filteredSchedules = [];
      if (getScheduleByConditionsDTO?.isRoundTrip?.trim() === 'true') {
        filteredSchedules = await this.schedulesService.getRoundTripSchedulesByConditions(
          getScheduleByConditionsDTO,
        );
      } else {
        filteredSchedules = await this.schedulesService.getSchedulesByConditions(
          getScheduleByConditionsDTO,
        );
      }
      const schedules = await Promise.all(
        filteredSchedules.map(async (filteredSchedule) => {
          const schedule = await this.schedulesService.getScheduleById(
            filteredSchedule.scheduleId,
          );
          const price = await this.ticketsService.getTicketPriceByScheduleAndSeatType(
            filteredSchedule.scheduleId,
            getScheduleByConditionsDTO.seatType,
          );
          const journeys = await this.getJourneysAndDetails(schedule.id);
          return { ...schedule, price, journeys };
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

  @MessagePattern('get_schedules_by_partner_conditions')
  async getSchedulesByPartnerAndConditions(
    @Payload() getScheduleByConditionsDTO: GetSchedulesByConditionsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      let flights = [];
      if (getScheduleByConditionsDTO?.isRoundTrip?.trim() === 'true') {
        flights = await this.schedulesService.getRoundTripSchedulesByPartnerAndConditions(
          getScheduleByConditionsDTO,
        );
      } else {
        flights = await this.schedulesService.getSchedulesByPartnerAndConditions(
          getScheduleByConditionsDTO,
        );
      }
      return flights;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_full_ticket_information')
  async getFullTicketInformation(
    @Payload() ticketId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const ticket = await this.schedulesService.getFullTicketInformation(
        ticketId,
      );
      return ticket;
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
      const { departureAt, arrivalAt, flightId, journeys } = addScheduleDTO;
      const schedule = await this.schedulesService.addSchedule(
        departureAt,
        arrivalAt,
        flightId,
      );
      const details = await Promise.all(
        journeys.map(async (each, journeyIndex) => {
          const journey = await this.journeysService.addJourney(
            each.departureAt,
            each.arrivalAt,
            schedule.id,
          );
          const stations = await Promise.all(
            each.stations.map(async (station, stationIndex) => {
              const addJourneyDetailsDTO: AddJourneyDetailsDTO = {
                orderNumber: journeyIndex * journeys.length + stationIndex,
                journeyId: journey.id,
                ...station,
              };
              const detail = await this.journeysService.addJourneyDetails(
                addJourneyDetailsDTO,
              );
              return detail;
            }),
          );
          return { ...journey, stations };
        }),
      );
      return { schedule: { ...schedule, journeys: details, tickets: [] } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('manipulate_schedule')
  async activateSchedule(
    @Payload() data: { scheduleId: string; mode: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.schedulesService.manipulateSchedule(
        data.scheduleId,
        data.mode,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('cancel_schedule')
  async cancelSchedule(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.schedulesService.cancelSchedule(scheduleId);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
