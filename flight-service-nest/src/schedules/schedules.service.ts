import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { GetSchedulesByConditionsDTO } from 'src/dtos/get-schedules-by-conditions.dto';
import { FilteredSchedule } from 'src/models/filtered-schedule.model';
import { Schedule } from 'src/models/schedule.model';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger('SchedulesService');

  constructor(private sequelize: Sequelize) {}

  async getSchedulesByFlightAndDate(
    flightId: string,
    date: Date,
  ): Promise<Schedule[]> {
    try {
      const schedules = await this.sequelize.query(
        'SP_GetSchedulesByFlightAndDate @flightId=:flightId, @date=:date',
        {
          type: QueryTypes.SELECT,
          replacements: { flightId, date },
          raw: true,
          mapToModel: true,
          model: Schedule,
        },
      );
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getSchedulesByConditions(
    getSchedulesByConditions: GetSchedulesByConditionsDTO,
  ): Promise<FilteredSchedule[]> {
    try {
      const filteredSchedules = await this.sequelize.query(
        'SP_GetSchedulesByConditions @date=:date, ' +
          '@seatType=:seatType, @numberOfPax=:numberOfPax, ' +
          '@depCity=:depCity, @depCountry=:depCountry, ' +
          '@desCity=:desCity, @desCountry=:desCountry',
        {
          type: QueryTypes.SELECT,
          replacements: {
            date: getSchedulesByConditions.date,
            seatType: getSchedulesByConditions.seatType,
            depCity: getSchedulesByConditions.depCity,
            depCountry: getSchedulesByConditions.depCountry,
            desCity: getSchedulesByConditions.desCity,
            desCountry: getSchedulesByConditions.desCountry,
            numberOfPax: getSchedulesByConditions.numberOfPax,
          },
          raw: true,
          mapToModel: true,
          model: FilteredSchedule,
        },
      );
      return filteredSchedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getRoundTripSchedulesByConditions(
    getSchedulesByConditions: GetSchedulesByConditionsDTO,
  ): Promise<FilteredSchedule[]> {
    try {
      const filteredSchedules = await this.sequelize.query(
        'SP_GetRoundTripSchedulesByConditions @departureDate=:departureDate, ' +
          '@returnDate=:returnDate, @seatType=:seatType, @numberOfPax=:numberOfPax, ' +
          '@depCity=:depCity, @depCountry=:depCountry, ' +
          '@desCity=:desCity, @desCountry=:desCountry',
        {
          type: QueryTypes.SELECT,
          replacements: {
            departureDate: getSchedulesByConditions.date,
            returnDate: getSchedulesByConditions.returnDate,
            seatType: getSchedulesByConditions.seatType,
            depCity: getSchedulesByConditions.depCity,
            depCountry: getSchedulesByConditions.depCountry,
            desCity: getSchedulesByConditions.desCity,
            desCountry: getSchedulesByConditions.desCountry,
            numberOfPax: getSchedulesByConditions.numberOfPax,
          },
          raw: true,
          mapToModel: true,
          model: FilteredSchedule,
        },
      );
      return filteredSchedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getSchedulesByPartnerAndConditions(
    getSchedulesByConditions: GetSchedulesByConditionsDTO,
  ) {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetSchedulesByPartnerAndConditions  @date=:date, ' +
          '@seatType=:seatType, @partnerId=:partnerId, ' +
          '@depCity=:depCity, @depCountry=:depCountry, ' +
          '@desCity=:desCity, @desCountry=:desCountry',
        {
          type: QueryTypes.RAW,
          replacements: {
            partnerId: getSchedulesByConditions.partnerId,
            date: getSchedulesByConditions.date,
            seatType: getSchedulesByConditions.seatType,
            depCity: getSchedulesByConditions.depCity,
            depCountry: getSchedulesByConditions.depCountry,
            desCity: getSchedulesByConditions.desCity,
            desCountry: getSchedulesByConditions.desCountry,
          },
        },
      );
      const schedules = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      );
      let flights = [];
      schedules.forEach((flight) => {
        if (flight.schedules.length > 0) flights.push(flight);
      });
      return flights;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getRoundTripSchedulesByPartnerAndConditions(
    getSchedulesByConditions: GetSchedulesByConditionsDTO,
  ) {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetRoundTripSchedulesByPartnerAndConditions  @departureDate=:departureDate, ' +
          '@returnDate=:returnDate, @seatType=:seatType, @partnerId=:partnerId, ' +
          '@depCity=:depCity, @depCountry=:depCountry, ' +
          '@desCity=:desCity, @desCountry=:desCountry',
        {
          type: QueryTypes.RAW,
          replacements: {
            partnerId: getSchedulesByConditions.partnerId,
            departureDate: getSchedulesByConditions.date,
            returnDate: getSchedulesByConditions.returnDate,
            seatType: getSchedulesByConditions.seatType,
            depCity: getSchedulesByConditions.depCity,
            depCountry: getSchedulesByConditions.depCountry,
            desCity: getSchedulesByConditions.desCity,
            desCountry: getSchedulesByConditions.desCountry,
          },
        },
      );
      const flightsJson = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      );
      let flights = [];
      flightsJson.forEach((flight) => {
        if (flight.schedules.length > 0) flights.push(flight);
      });
      return flights;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getScheduleById(scheduleId: string): Promise<Schedule> {
    try {
      const schedule = await this.sequelize.query(
        'SP_GetScheduleById @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Schedule,
        },
      );
      return schedule[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getFullTicketInformation(ticketId: string) {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetTicketFullInformation @ticketId=:ticketId',
        {
          replacements: { ticketId },
          type: QueryTypes.RAW,
          raw: true,
        },
      );
      const ticketInformation = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      );
      return ticketInformation;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async addSchedule(
    departureAt: Date,
    arrivalAt: Date,
    flightId: string,
  ): Promise<Schedule> {
    try {
      const schedule = await this.sequelize.query(
        'SP_AddSchedule @departureAt=:departureAt, ' +
          '@arrivalAt=:arrivalAt, @flightId=:flightId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            departureAt,
            arrivalAt,
            flightId,
          },
          raw: true,
          mapToModel: true,
          model: Schedule,
        },
      );
      return schedule[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error.message);
    }
  }

  async manipulateSchedule(scheduleId: string, mode: string) {
    try {
      const result = await this.sequelize.query(
        `SP_${mode}Schedule @scheduleId=:scheduleId`,
        {
          type: QueryTypes.UPDATE,
          replacements: { scheduleId },
        },
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error.message);
    }
  }

  async cancelSchedule(scheduleId: string) {
    try {
      const result = await this.sequelize.query(
        'SP_CancelSchedule @scheduleId=:scheduleId',
        {
          type: QueryTypes.UPDATE,
          replacements: { scheduleId },
        },
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error.message);
    }
  }
}
