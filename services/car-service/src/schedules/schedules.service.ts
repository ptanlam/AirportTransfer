import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';

import { ScheduleDetailsDTO } from '../dtos/add-cars-scheduleDetails.dto';
import { JourneysDTO } from '../dtos/add-journeys.dto';
import { SchedulesDTO } from '../dtos/add-schedules.dto';
import { Journeys } from '../models/journey.model';
import { ScheduleDetails } from '../models/scheduleDetails.model';
import { Schedules } from '../models/schedules.model';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger('SchedulesService');

  constructor(private sequelize: Sequelize) {}

  async getSchedulesByCarDate(
    carId: string,
    date: string,
  ): Promise<Schedules[]> {
    try {
      const schedules = await this.sequelize.query(
        `SP_GetSchedulesByCarAndDate @carId=:carId, @date=:date`,
        {
          type: QueryTypes.SELECT,
          replacements: { carId, date },
          raw: true,
          mapToModel: true,
          model: Schedules,
        },
      );
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getJourneys(scheduleId: string): Promise<Journeys[]> {
    try {
      const details = await this.sequelize.query(
        'SP_GetJourneys @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Journeys,
        },
      );
      return details;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async addSchedule(schedulesDTO: SchedulesDTO): Promise<Schedules> {
    try {
      const inserted = await this.sequelize.query(
        `SP_AddSchedules @date=:date,@start=:start,@travel=:travel`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            date: schedulesDTO.date,
            start: schedulesDTO.start,
            travel: schedulesDTO.travel,
          },
          raw: true,
          mapToModel: true,
          model: Schedules,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
  async addJourney(
    journeyDTO: JourneysDTO,
    scheduleId: string,
  ): Promise<Journeys> {
    try {
      const inserted = await this.sequelize.query(
        `SP_AddJourneys @scheduleId=:scheduleId, @description=:description,` +
          `@placeId=:placeId, @orderNumber=:orderNumber, ` +
          `@district=:district, @city=:city, @country=:country`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            scheduleId,
            placeId: journeyDTO.placeId,
            description: journeyDTO.description,
            district: journeyDTO.district,
            city: journeyDTO.city,
            country: journeyDTO.country,
            orderNumber: journeyDTO.orderNumber,
          },
          raw: true,
          mapToModel: true,
          model: Journeys,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
  async addScheduleDetail(
    car: ScheduleDetailsDTO,
    scheduleId: string,
  ): Promise<ScheduleDetails> {
    try {
      const inserted = await this.sequelize.query(
        `SP_AddScheduleDetails @id=:id, @scheduleId=:scheduleId`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            scheduleId,
            id: car.id,
          },
          raw: true,
          mapToModel: true,
          model: ScheduleDetails,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async removeScheduleCompletely(scheduleId: string): Promise<Schedules> {
    try {
      const remove = await this.sequelize.query(
        `SP_RemoveScheduleCompletely @scheduleId=:scheduleId`,
        {
          type: QueryTypes.DELETE,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Schedules,
        },
      );
      return remove[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async cancelScheduleBooked(scheduleId: string): Promise<Schedules> {
    try {
      const cancel = await this.sequelize.query(
        `SP_CancellationScheduleBooked @scheduleId=:scheduleId`,
        {
          type: QueryTypes.UPDATE,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Schedules,
        },
      );
      return cancel[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async activateScheduleBooked(scheduleId: string): Promise<Schedules> {
    try {
      const activate = await this.sequelize.query(
        `SP_ActivateSchedule @scheduleId=:scheduleId`,
        {
          type: QueryTypes.UPDATE,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Schedules,
        },
      );
      return activate[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
