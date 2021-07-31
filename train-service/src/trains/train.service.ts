import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';
import { TrainDTO } from '../dtos/train.dto';
import { UpdateTrainDTO } from '../dtos/update-train.dto';
import { Train } from '../models/train.model';

@Injectable()
export class TrainService {
  private readonly logger = new Logger('TrainsService');

  constructor(private sequelize: Sequelize) {}

  async getTrainsByPartner(partnerId: string) {
    try {
      const trains = await this.sequelize.query(
        'SP_GetTrainsByPartner @partnerId=:partnerId',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId },
          mapToModel: true,
          model: Train,
          raw: true,
        },
      );
      return trains;
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async registerTrain(trainDTO: TrainDTO): Promise<Train> {
    try {
      const train = await this.sequelize.query(
        `SP_RegisterTrain @name=:name, @photoUrl=:photoUrl,` +
          ` @ticketPrice=:ticketPrice, @classId=:classId, ` +
          `@partnerId=:partnerId`,
        {
          type: QueryTypes.SELECT,
          mapToModel: true,
          model: Train,
          replacements: {
            name: trainDTO.name,
            photoUrl: trainDTO.photoUrl,
            ticketPrice: trainDTO.ticketPrice,
            partnerId: trainDTO.partnerId,
            classId: trainDTO.classId,
          },
          raw: true,
        },
      );
      return train[0];
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async getTrainByJourney(journeyId: string): Promise<Train> {
    try {
      const train = await this.sequelize.query(
        'SP_GetTrainByJourney @journeyId=:journeyId',
        {
          type: QueryTypes.SELECT,
          replacements: { journeyId },
          raw: true,
          mapToModel: true,
          model: Train,
        },
      );
      return train[0];
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async updateTrainInformation(trainUpdateDTO: UpdateTrainDTO): Promise<Train> {
    try {
      const train = await this.sequelize.query(
        `SP_UpdateTrainInformation @vehicleId=:vehicleId,` +
          ` @name=:name, @photoUrl=:photoUrl, ` +
          `@ticketPrice=:ticketPrice, @classId=:classId`,
        {
          replacements: {
            vehicleId: trainUpdateDTO.vehicleId,
            name: trainUpdateDTO.name,
            photoUrl: trainUpdateDTO.photoUrl,
            ticketPrice: trainUpdateDTO.ticketPrice,
            classId: trainUpdateDTO.classId,
          },
          type: QueryTypes.SELECT,
          mapToModel: true,
          model: Train,
          raw: true,
        },
      );
      return train[0];
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async unregisterTrain(trainId: string) {
    try {
      const train = await this.sequelize.query(
        'SP_UnregisterTrain @trainId=:trainId',
        {
          replacements: {
            trainId: trainId,
          },
          type: QueryTypes.SELECT,
          raw: true,
        },
      );
      return train[0]['canBeUnregistered'];
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async getTicketInformation(scheduleDetailId: string) {
    try {
      const ticketFullInformation = await this.sequelize.query(
        'SP_GetTicketFullInformation @scheduleDetailId=:scheduleDetailId',
        {
          replacements: { scheduleDetailId },
          raw: true,
          type: QueryTypes.RAW,
        },
      );
      const ticket = ticketFullInformation[0]
        .map((each: string) => {
          return Object.values(each)[0];
        })
        .reduce((acc: string, curr: string) => acc + curr);
      return JSON.parse(ticket);
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }
}
