import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError } from 'sequelize';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import { AddJourneyDetailsDTO } from 'src/dtos/add-journey-details.dto';
import { JourneyDetails } from 'src/models/journey-details.model';
import { Journey } from 'src/models/journey.model';
import { Ticket } from 'src/models/ticket.model';

@Injectable()
export class JourneysService {
  private readonly logger = new Logger('JourneysService');

  constructor(private sequelize: Sequelize) {}

  async getJourneysBySchedule(scheduleId: string): Promise<Journey[]> {
    try {
      const journeys = await this.sequelize.query(
        'SP_GetJourneysBySchedule @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId },
          raw: true,
          mapToModel: true,
          model: Journey,
        },
      );
      return journeys;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async addJourney(
    departureAt: Date,
    arrivalAt: Date,
    scheduleId: string,
  ): Promise<Journey> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddJourney @departureAt=:departureAt, ' +
          '@arrivalAt=:arrivalAt, @scheduleId=:scheduleId',
        {
          type: QueryTypes.SELECT,
          replacements: { scheduleId, departureAt, arrivalAt },
          raw: true,
          mapToModel: true,
          model: Journey,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getJourneyDetailsByJourney(
    journeyId: string,
  ): Promise<JourneyDetails[]> {
    try {
      const stations = await this.sequelize.query(
        'SP_GetJourneyDetailsByJourney @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId },
          raw: true,
          mapToModel: true,
          model: JourneyDetails,
        },
      );
      return stations;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async addJourneyDetails(
    addJourneyDetailsDTO: AddJourneyDetailsDTO,
  ): Promise<JourneyDetails> {
    try {
      const journeyDetails = await this.sequelize.query(
        'SP_AddJourneyDetails @orderNumber=:orderNumber, ' +
          '@description=:description, @placeId=:placeId, @district=:district, ' +
          '@city=:city, @country=:country, @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            orderNumber: addJourneyDetailsDTO.orderNumber,
            description: addJourneyDetailsDTO.description,
            placeId: addJourneyDetailsDTO.placeId,
            district: addJourneyDetailsDTO.district,
            city: addJourneyDetailsDTO.city,
            country: addJourneyDetailsDTO.country,
            journeyId: addJourneyDetailsDTO.journeyId,
          },
          raw: true,
          mapToModel: true,
          model: JourneyDetails,
        },
      );
      return journeyDetails[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
