import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { RegisterStationDTO } from '../dtos/register-station.dto';
import { JourneyDetails } from '../models/journey-details.model';
import { Journey } from '../models/journey.model';

@Injectable()
export class JourneysService {
  private readonly logger = new Logger('JourneysService');

  constructor(private sequelize: Sequelize) {}

  async getJourneysByBus(busId: string): Promise<any> {
    try {
      const journeys = await this.sequelize.query(
        'SP_GetJourneysByBus @busId=:busId',
        {
          type: QueryTypes.SELECT,
          replacements: { busId },
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

  async addJourney(vehicleId: string, travelTime: string): Promise<Journey> {
    try {
      const inserted = await this.sequelize.query(
        'SP_AddJourney @busId=:busId, @travelTime=:travelTime',
        {
          type: QueryTypes.SELECT,
          replacements: {
            busId: vehicleId,
            travelTime,
          },
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

  async activateJourney(journeyId: string): Promise<Journey[]> {
    try {
      const journeys = await this.sequelize.query(
        'SP_ActivateJourney @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId },
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

  async deactivateJourney(journeyId: string): Promise<Journey[]> {
    try {
      const journeys = await this.sequelize.query(
        'SP_DeactivateJourney @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId },
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
    stationsDTOs: RegisterStationDTO[],
    journeyId: string,
  ): Promise<JourneyDetails[]> {
    try {
      const insertedStations = await Promise.all(
        stationsDTOs.map(async (station, index) => {
          const inserted = await this.sequelize.query(
            'SP_AddJourneyDetails @journeyId=:journeyId, ' +
              '@orderNumber=:orderNumber, @description=:description, ' +
              '@placeId=:placeId, @district=:district, @city=:city, ' +
              '@country=:country',
            {
              type: QueryTypes.SELECT,
              replacements: {
                journeyId,
                description: station.description,
                placeId: station.placeId,
                district: station.district,
                city: station.city,
                country: station.country,
                orderNumber: index,
              },
              mapToModel: true,
              model: JourneyDetails,
            },
          );
          return inserted[0];
        }),
      );
      return insertedStations;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
