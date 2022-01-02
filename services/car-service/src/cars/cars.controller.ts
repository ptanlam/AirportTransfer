import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CarModelDTO } from '../dtos/add-car-model.dto';
import { AddCarsDTO } from '../dtos/add-cars.dto';
import { GetCarsByConditionsDTO } from '../dtos/get-cars-by-conditions.dto';
import { UpdateCarModelInformationDTO } from '../dtos/update-car-model-information.dto';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  private readonly logger = new Logger('CarsController');

  constructor(private carsService: CarsService) {}

  @MessagePattern('get_cars_by_conditions')
  public async getCarsByConditions(
    @Payload() getCarsByConditionsDTO: GetCarsByConditionsDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const filteredCar = await this.carsService.getCarsByConditions(
        getCarsByConditionsDTO,
      );
      return { vehicles: filteredCar };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_cars_by_conditions_and_partner')
  public async getCarsByConditionsAndPartner(
    @Payload()
    data: {
      getCarsByConditionsDTO: GetCarsByConditionsDTO;
      partnerId: string;
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const filteredCar = await this.carsService.getCarsByConditionsAndPartner(
        data.partnerId,
        data.getCarsByConditionsDTO,
      );
      return { vehicles: filteredCar };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_cars_by_partner')
  async getCarsByPartner(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const carModels = await this.carsService.getCarModelsByPartner(partnerId);
      const cars = await Promise.all(
        carModels.map(async (carModel) => {
          const details = await this.carsService.getCarsByCarModel(carModel.id);
          return { ...carModel, details };
        }),
      );
      return { cars };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_car_by_licence_plate')
  async getCarByLicencePlate(
    @Payload() licencePlate: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const car = await this.carsService.getCarByLicencePlate(licencePlate);
      return { vehicle: car };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('register_car_model_and_cars')
  async registerCarModelAndCars(
    @Payload() carModelDTO: CarModelDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const carModel = await this.carsService.registerCarModel(carModelDTO);
      const details = await Promise.all(
        carModelDTO.details.map(async (carDTO) => {
          const car = await this.carsService.registerCar(carDTO, carModel.id);
          return car;
        }),
      );
      return {
        vehicle: { ...carModel, details },
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('add_cars')
  async addCars(@Payload() addCarsDTO: AddCarsDTO, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const { carModelId, cars } = addCarsDTO;
      const addedCars = await Promise.all(
        cars.map(async (addCarDTO) => {
          const car = await this.carsService.registerCar(addCarDTO, carModelId);
          return car;
        }),
      );
      return { cars: addedCars };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('update_car_model')
  async updateCarModel(
    @Payload() updateCarModelInformationDTO: UpdateCarModelInformationDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const carModel = await this.carsService.updateCarModelInformation(
        updateCarModelInformationDTO,
      );
      const details = await this.carsService.getCarsByCarModel(carModel.id);
      return { vehicle: { ...carModel, details } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('unregister_car_model')
  async unRegisterCarModel(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const carModel = await this.carsService.unRegisterCarModel(id);
      return carModel;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('unregister_car')
  async unRegisterCar(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const car = await this.carsService.unRegisterCar(id);
      return car;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_full_ticket_information')
  async getInformationBooked(
    @Payload() scheduleId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const infoBooked = this.carsService.getInformationBooked(scheduleId);
      return infoBooked;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
