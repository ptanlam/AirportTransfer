import { Injectable, Logger } from '@nestjs/common';
import { DatabaseError, QueryTypes, Sequelize } from 'sequelize';

import { CarModelDTO } from '../dtos/add-car-model.dto';
import { AddCarDTO } from '../dtos/add-cars.dto';
import { GetCarsByConditionsDTO } from '../dtos/get-cars-by-conditions.dto';
import { UpdateCarModelInformationDTO } from '../dtos/update-car-model-information.dto';
import { Car } from '../models/car.model';
import { CarModel } from '../models/carModel.model';

@Injectable()
export class CarsService {
  private readonly logger = new Logger('CarsService');

  constructor(private sequelize: Sequelize) {}

  async getCarModelsByPartner(partnerId: string) {
    try {
      const carModels = await this.sequelize.query(
        'SP_GetCarModelsByPartner @partnerId=:partnerId',
        {
          type: QueryTypes.SELECT,
          replacements: { partnerId },
          raw: true,
          mapToModel: true,
          model: CarModel,
        },
      );
      return carModels;
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async getCarsByCarModel(carModelId: string): Promise<Car[]> {
    try {
      const cars = await this.sequelize.query(
        'SP_GetCarsByCarModel @carModelId=:carModelId',
        {
          type: QueryTypes.SELECT,
          replacements: { carModelId },
          raw: true,
          mapToModel: true,
          model: Car,
        },
      );
      return cars;
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getCarModelById(id: string): Promise<CarModel> {
    try {
      const carModel = await this.sequelize.query(
        'SP_GetCarModelById @id=:id',
        {
          type: QueryTypes.SELECT,
          replacements: { id },
          raw: true,
          mapToModel: true,
          model: CarModel,
        },
      );
      return carModel[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getCarsByConditions(getCarsByConditionsDTO: GetCarsByConditionsDTO) {
    try {
      const car = await this.sequelize.query(
        `SP_GetCarsByConditions @date=:date, @pickUpTime=:pickUpTime, ` +
          `@depCity=:depCity, @depCountry=:depCountry,@travel=:travel`,
        {
          type: QueryTypes.RAW,
          replacements: { ...getCarsByConditionsDTO },
        },
      );
      if (
        typeof Object.keys(car) == null ||
        typeof Object.keys(car) == 'undefined' ||
        !car[0].length
      )
        return car[0];
      {
        const cars: string = Object.values(car[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(cars);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getCarsByConditionsAndPartner(
    partnerId: string,
    getCarsByConditionsDTO: GetCarsByConditionsDTO,
  ) {
    try {
      const cars = await this.sequelize.query(
        `SP_GetCarsByConditionsAndPartner @date=:date, @pickUpTime=:pickUpTime, ` +
          `@depCity=:depCity, @depCountry=:depCountry,@travel=:travel,@partnerId=:partnerId`,
        {
          type: QueryTypes.RAW,
          replacements: {
            ...getCarsByConditionsDTO,
            partnerId,
          },
        },
      );
      if (
        typeof Object.keys(cars) == null ||
        typeof Object.keys(cars) == 'undefined' ||
        !cars[0].length
      )
        return cars[0];
      {
        const Cars: string = Object.values(cars[0])
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr, '');
        return JSON.parse(Cars);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getCarByLicencePlate(licencePlate: string): Promise<Car> {
    try {
      const car = await this.sequelize.query(
        'SP_GetCarByLicencePlate @licencePlate=:licencePlate',
        {
          type: QueryTypes.SELECT,
          replacements: { licencePlate },
          raw: true,
          mapToModel: true,
          model: Car,
        },
      );
      return car[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async registerCarModel(carModelDTO: CarModelDTO) {
    try {
      const inserted = await this.sequelize.query(
        `SP_RegisterCarModels @name=:name, @luggagePayload=:luggagePayload, ` +
          `@guestQuantity=:guestQuantity, @partnerId=:partnerId, ` +
          `@photoUrl=:photoUrl, @standardPricePerKm=:standardPricePerKm, ` +
          `@country=:country, @city=:city, @classId=:classId`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            name: carModelDTO.name,
            luggagePayload: carModelDTO.luggagePayload,
            guestQuantity: carModelDTO.guestQuantity,
            partnerId: carModelDTO.partnerId,
            photoUrl: carModelDTO.photoUrl,
            standardPricePerKm: carModelDTO.standardPricePerKm,
            country: carModelDTO.country,
            city: carModelDTO.city,
            classId: carModelDTO.classId,
          },
          raw: true,
          mapToModel: true,
          model: CarModel,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw DatabaseError;
    }
  }

  async registerCar(
    addCarDTO: AddCarDTO,
    carModelId: string,
  ): Promise<Car | boolean> {
    try {
      const inserted = await this.sequelize.query(
        `SP_RegisterCars @licencePlate=:licencePlate, @color=:color, ` +
          `@carModelId=:carModelId`,
        {
          type: QueryTypes.SELECT,
          replacements: {
            licencePlate: addCarDTO.licencePlate,
            color: addCarDTO.color,
            carModelId,
          },
          raw: true,
          mapToModel: true,
          model: Car,
        },
      );
      return inserted[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async updateCarModelInformation(
    updateCarModelInformationDTO: UpdateCarModelInformationDTO,
  ): Promise<CarModel> {
    try {
      const carModel = await this.sequelize.query(
        'SP_UpdateCarModelInformation @id=:vehicleId, @name=:name, ' +
          '@luggagePayload=:luggagePayload, @guestQuantity=:guestQuantity, ' +
          '@photoUrl=:photoUrl, @classId=:classId, @city=:city, ' +
          '@standardPricePerKm=:standardPricePerKm, @country=:country',
        {
          type: QueryTypes.SELECT,
          replacements: { ...updateCarModelInformationDTO },
          raw: true,
          mapToModel: true,
          model: CarModel,
        },
      );
      return carModel[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async unRegisterCarModel(id: string) {
    try {
      const carModel = await this.sequelize.query(
        `SP_UnRegisterCarModel @id=:id`,
        {
          type: QueryTypes.SELECT,
          replacements: { id: id },
          raw: true,
          mapToModel: true,
          model: CarModel,
        },
      );
      return carModel[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async unRegisterCar(id: string): Promise<Car> {
    try {
      const car = await this.sequelize.query(`SP_UnRegisterCar @id=:id`, {
        type: QueryTypes.SELECT,
        replacements: { id: id },
        raw: true,
        mapToModel: true,
        model: Car,
      });
      return car[0];
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }

  async getInformationBooked(scheduleId: String) {
    try {
      const informationBooked = await this.sequelize.query(
        `SP_GetCarScheduleBooked @scheduleId=:scheduleId`,
        {
          replacements: { scheduleId },
          raw: true,
          type: QueryTypes.RAW,
        },
      );
      if (
        typeof Object.keys(informationBooked) == null ||
        typeof Object.keys(informationBooked) == 'undefined' ||
        !informationBooked[0].length
      )
        return informationBooked[0];
      {
        const infoBooked = informationBooked[0]
          .map((each: string) => {
            return Object.values(each)[0];
          })
          .reduce((acc: string, curr: string) => acc + curr);
        return JSON.parse(infoBooked);
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseError(error);
    }
  }
}
