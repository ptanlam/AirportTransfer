import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { AddScheduleDTO } from '../dtos/add-schedule.dto';
import { GetSchedulesByConditionsDTO } from '../dtos/get-schedules-by-conditions.dto';
import { FilteredSchedule } from '../models/filtered-schedule.model';
import { ScheduleDetails } from '../models/schedule-details.model';
import { Schedule } from '../models/schedule.model';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger('SchedulesService');

  constructor(private sequelize: Sequelize) {}

  async getScheduleByJourneyAndDate(
    journeyId: string,
    date: string,
  ): Promise<Schedule> {
    try {
      const schedules = await this.sequelize.query(
        'SP_GetScheduleByJourneyAndDate @journeyId=:journeyId, ' +
          '@date=:date',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId, date },
          raw: true,
          mapToModel: true,
          model: Schedule,
        },
      );
      return schedules[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getScheduleDetailsBySchedule(
    scheduleId: string,
    pickUpTime: string | null = null,
  ): Promise<ScheduleDetails[]> {
    try {
      const scheduleDetails = await this.sequelize.query(
        'SP_GetScheduleDetailsBySchedule @scheduleId=:scheduleId, ' +
          '@pickUpTime=:pickUpTime',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId, pickUpTime },
          raw: true,
          mapToModel: true,
          model: ScheduleDetails,
        },
      );
      return scheduleDetails;
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

  async getSchedulesByConditions(
    getSchedulesByConditionsDTO: GetSchedulesByConditionsDTO,
  ): Promise<FilteredSchedule[]> {
    try {
      const schedules = await this.sequelize.query(
        'SP_GetSchedulesByConditions @depDistrict=:depDistrict, @depCity=:depCity, ' +
          '@depCountry=:depCountry, @desDistrict=:desDistrict, ' +
          '@desCity=:desCity, @desCountry=:desCountry, @date=:date, ' +
          '@pickUpTime=:pickUpTime, @numberOfPax=:numberOfPax',
        {
          type: QueryTypes.SELECT,
          replacements: {
            ...getSchedulesByConditionsDTO,
          },
          raw: true,
          mapToModel: true,
          model: FilteredSchedule,
        },
      );
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getTicketInformation(scheduleDetailId: string) {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetTicketInformation @scheduleDetailId=:scheduleDetailId',
        {
          replacements: { scheduleDetailId },
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
    addScheduleDTO: AddScheduleDTO,
  ): Promise<ScheduleDetails[]> {
    try {
      const details = await this.sequelize.query(
        'SP_AddSchedule @date=:date, @startTime=:startTime, ' +
          '@endTime=:endTime, @gap=:gap, ' +
          '@numberOfVehicles=:numberOfVehicles, @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            date: addScheduleDTO.date,
            startTime: addScheduleDTO.startTime,
            endTime: addScheduleDTO.endTime,
            gap: addScheduleDTO.gap,
            numberOfVehicles: addScheduleDTO.numberOfVehicles,
            journeyId: addScheduleDTO.journeyId,
          },
          raw: true,
          mapToModel: true,
          model: ScheduleDetails,
        },
      );
      return details;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async manipulateScheduleDetails(
    scheduleDetailId: string,
    type: string,
  ): Promise<ScheduleDetails> {
    try {
      const scheduleDetails = await this.sequelize.query(
        `SP_${type}ScheduleDetail @scheduleDetailId=:scheduleDetailId`,
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleDetailId },
          raw: true,
          mapToModel: true,
          model: ScheduleDetails,
        },
      );
      return scheduleDetails[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async cancelScheduleDetail(
    scheduleDetailId: string,
  ): Promise<ScheduleDetails> {
    try {
      const detail = await this.sequelize.query(
        'SP_CancelScheduleDetail @scheduleDetailId=:scheduleDetailId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleDetailId },
          raw: true,
          mapToModel: true,
          model: ScheduleDetails,
        },
      );
      return detail[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async revokeTickets(
    scheduleDetailId: string,
    numberOfTickets: number,
  ): Promise<boolean> {
    try {
      const result = await this.sequelize.query(
        'SP_RevokeTickets @scheduleDetailId=:scheduleDetailId, ' +
          '@numberOfTickets=:numberOfTickets',
        {
          type: QueryTypes.UPDATE,
          replacements: { scheduleDetailId, numberOfTickets },
        },
      );
      return result[1] !== 1;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  getJourneysByStations(stations) {
    let departureIndices = [];
    stations.forEach((station, index) => {
      if (station.orderNumber === 0) departureIndices.push(index);
    });
    let journeys = [];
    departureIndices.forEach((departureIndex, index) => {
      journeys.push(
        stations.slice(departureIndex, departureIndices[index + 1]),
      );
    });
    return journeys;
  }

  async getScheduleDetailsByPartnerAndConditions(
    partnerId: string,
    getSchedulesByConditionsDTO: GetSchedulesByConditionsDTO,
  ) {
    try {
      const jsonRecord = await this.sequelize.query(
        'SP_GetScheduleDetailsByPartnerAndConditions @depDistrict=:depDistrict, @depCity=:depCity, ' +
          '@depCountry=:depCountry, @desDistrict=:desDistrict, ' +
          '@desCity=:desCity, @desCountry=:desCountry, @date=:date, ' +
          '@pickUpTime=:pickUpTime, @partnerId=:partnerId',
        {
          type: QueryTypes.RAW,
          replacements: {
            ...getSchedulesByConditionsDTO,
            partnerId,
          },
        },
      );
      if (!jsonRecord[0].length) return jsonRecord[0];
      const schedules = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      ).map((schedule) => {
        const stations = this.getJourneysByStations(schedule.stations);
        return { ...schedule, stations };
      });
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
