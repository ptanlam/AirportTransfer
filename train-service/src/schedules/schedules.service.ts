import { Body, Delete, Injectable, Logger, Patch } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { AddScheduleDTO } from '../dtos/add-schedule.dto';
import { BookTrainDto } from '../dtos/create-book.dtos';
import { GetSchedulesByConditionsDTO } from '../dtos/get-schedules-by-conds.dto';
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
        'SP_GetScheduleByJourneyAndDate @journeyId=:journeyId, @date=:date',
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

  async addSchedule(
    addScheduleDTO: AddScheduleDTO,
  ): Promise<ScheduleDetails[]> {
    try {
      const details = await this.sequelize.query(
        'SP_AddSchedule @date=:date, @startTime=:startTime, ' +
          '@endTime=:endTime, @gap=:gap, ' +
          '@journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            date: addScheduleDTO.date,
            startTime: addScheduleDTO.startTime,
            endTime: addScheduleDTO.endTime,
            gap: addScheduleDTO.gap,
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
          '@pickUpTime=:pickUpTime',
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

  async getScheduleDetailsBySchedule(
    scheduleId: string,
    pickUpTime: string | null = null,
  ) {
    try {
      const scheduleDetails = await this.sequelize.query(
        'SP_GetScheduleDetailsBySchedule @scheduleId=:scheduleId, @pickUpTime=:pickUpTime',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId: scheduleId, pickUpTime: pickUpTime },
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

  async bookTrain(bookTrainDto: BookTrainDto) {
    try {
      const isBookable = await this.sequelize.query(
        'SP_BookTrain @scheduleDetailId=:scheduleDetailId, @numberOfTickets=:numberOfTickets',
        {
          type: QueryTypes.SELECT,
          raw: true,
          replacements: {
            scheduleDetailId: bookTrainDto.scheduleDetailId,
            numberOfTickets: bookTrainDto.numberOfTickets,
          },
        },
      );
      return isBookable[0]['success'];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async cancelBook(@Body() bookTrainDto: BookTrainDto) {
    try {
      const cancelBook = await this.sequelize.query(
        'SP_RevokeTickets @scheduleDetailId=:scheduleDetailId, @numberOfTickets=:numberOfTickets',
        {
          type: QueryTypes.SELECT,
          raw: true,
          replacements: {
            scheduleDetailId: bookTrainDto.scheduleDetailId,
            numberOfTickets: bookTrainDto.numberOfTickets,
          },
        },
      );
      return cancelBook[0]['success'];
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
      return result[1] === 2;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
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
      const schedules = JSON.parse(
        Object.values(jsonRecord[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, ''),
      );
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
