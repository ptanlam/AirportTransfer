import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { BookBusDTO } from '../dtos/book-bus.dto';
import { EditBusDTO } from '../dtos/edit-bus.dto';
import { RegisterBusDTO } from '../dtos/register-bus.dto';
import { Bus } from '../models/bus.model';

@Injectable()
export class BusesService {
  private readonly logger = new Logger('BusesService');

  constructor(private sequelize: Sequelize) {}

  async getBusesByPartner(partnerId: string): Promise<Bus[]> {
    try {
      const buses = await this.sequelize.query(
        'SP_GetBusesByPartner @partnerId=:partnerId',
        {
          replacements: { partnerId },
          type: QueryTypes.SELECT,
          raw: true,
          mapToModel: true,
          model: Bus,
        },
      );
      return buses;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getBusByJourney(journeyId: string): Promise<Bus> {
    try {
      const bus = await this.sequelize.query(
        'SP_GetBusByJourney @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId },
          raw: true,
          mapToModel: true,
          model: Bus,
        },
      );
      return bus[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async registerBus(registerBusDTO: RegisterBusDTO): Promise<Bus> {
    try {
      const bus = await this.sequelize.query(
        'SP_RegisterBus @name=:name, @guestQuantity=:guestQuantity, ' +
          '@ticketPrice=:ticketPrice, @photoUrl=:photoUrl, ' +
          '@partnerId=:partnerId, @classId=:classId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: registerBusDTO.name,
            guestQuantity: registerBusDTO.guestQuantity,
            ticketPrice: registerBusDTO.ticketPrice,
            photoUrl: registerBusDTO.photoUrl,
            partnerId: registerBusDTO.partnerId,
            classId: registerBusDTO.classId,
          },
          raw: true,
          mapToModel: true,
          model: Bus,
        },
      );
      return bus[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async updateBusInformation(editBusDTO: EditBusDTO): Promise<Bus> {
    try {
      const bus = await this.sequelize.query(
        'SP_UpdateBusInformation @busId=:busId, @name=:name, ' +
          '@guestQuantity=:guestQuantity, @ticketPrice=:ticketPrice, ' +
          '@photoUrl=:photoUrl, @classId=:classId',
        {
          type: QueryTypes.SELECT,
          replacements: {
            busId: editBusDTO.vehicleId,
            name: editBusDTO.name,
            guestQuantity: editBusDTO.guestQuantity,
            ticketPrice: editBusDTO.ticketPrice,
            photoUrl: editBusDTO.photoUrl,
            classId: editBusDTO.classId,
          },
          raw: true,
          mapToModel: true,
          model: Bus,
        },
      );
      return bus[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async bookBus(bookBusDTO: BookBusDTO): Promise<boolean> {
    try {
      const result = await this.sequelize.query(
        'SP_BookBus @scheduleDetailId=:scheduleDetailId, ' +
          '@numberOfTickets=:numberOfTickets',
        {
          type: QueryTypes.SELECT,
          replacements: {
            scheduleDetailId: bookBusDTO.scheduleDetailId,
            numberOfTickets: bookBusDTO.numberOfTickets,
          },
          raw: true,
        },
      );
      return result[0]['success'];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async unregisterBus(busId: string): Promise<boolean> {
    try {
      const result = await this.sequelize.query(
        'SP_UnregisterBus @busId=:busId',
        {
          type: QueryTypes.UPDATE,
          replacements: { busId },
        },
      );
      return result[1] === 3;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
