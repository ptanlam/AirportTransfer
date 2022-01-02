import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { EditFlightDTO } from 'src/dtos/edit-flight.dto';
import { RegisterFlightDTO } from 'src/dtos/register-flight.dto';
import { Flight } from '../models/flight.model';

@Injectable()
export class FlightsService {
  private readonly logger = new Logger('FlightsService');

  constructor(private sequelize: Sequelize) {}

  async getFlightsByPartner(partnerId: string): Promise<Flight[]> {
    try {
      const flights = await this.sequelize.query(
        'SP_GetFlightsByPartner @partnerId=:partnerId',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId },
          mapToModel: true,
          model: Flight,
        },
      );
      return flights;
    } catch (error) {
      throw DatabaseError;
    }
  }

  async getFlightById(flightId: string): Promise<Flight> {
    try {
      const flight = await this.sequelize.query(
        'SP_GetFlightById @flightId=:flightId',
        {
          type: QueryTypes.SELECT,
          replacements: { flightId },
          raw: true,
          mapToModel: true,
          model: Flight,
        },
      );
      return flight[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async registerFlight(registerFlightDTO: RegisterFlightDTO): Promise<Flight> {
    try {
      const flight = await this.sequelize.query(
        'SP_RegisterFlight @name=:name, @guestQuantity=:guestQuantity, ' +
          '@partnerId=:partnerId, @photoUrl=:photoUrl',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: registerFlightDTO.name,
            guestQuantity: registerFlightDTO.guestQuantity,
            partnerId: registerFlightDTO.partnerId,
            photoUrl: registerFlightDTO.photoUrl,
          },
          raw: true,
          mapToModel: true,
          model: Flight,
        },
      );
      return flight[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async updateFlight(editFlightDTO: EditFlightDTO): Promise<Flight> {
    try {
      const flight = await this.sequelize.query(
        'SP_UpdateFlight @flightId=:flightId, @name=:name, ' +
          '@guestQuantity=:guestQuantity, @photoUrl=:photoUrl',
        {
          type: QueryTypes.SELECT,
          replacements: {
            flightId: editFlightDTO.vehicleId,
            name: editFlightDTO.name,
            guestQuantity: editFlightDTO.guestQuantity,
            photoUrl: editFlightDTO.photoUrl,
          },
          raw: true,
          mapToModel: true,
          model: Flight,
        },
      );
      return flight[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
