import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { json } from 'sequelize';
import { CarModelDTO } from '../dtos/add-car-model.dto';
import { CarDTO } from '../dtos/add-car.dto';
import { AddCarDTO } from '../dtos/add-cars.dto';
import { UpdateCarModelInformationDTO } from '../dtos/update-car-model-information.dto';
import { Car } from '../models/car.model';
import { CarModel } from '../models/carModel.model';
import { SchedulesModule } from '../schedules/schedules.module';
import { CarsModule } from './cars.module';
import { CarsService } from './cars.service';

describe('CarsService', () => {
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development'],
        }),
        SequelizeModule.forRoot({
          dialect: 'mssql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }),
        CarsModule,
        SchedulesModule,
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  describe('getCarModelsByPartner', () => {
    it('should return an array of carModels', async () => {
      const result1: CarModel[] = [];
      jest
        .spyOn(carsService, 'getCarModelsByPartner')
        .mockResolvedValue(result1);
      expect(await carsService.getCarModelsByPartner('1')).toBe(result1);
    });
  });

  describe('getCarByLicencePlate', () => {
    it('should return an array of car', async () => {
      const result3: Car[] = [];
      jest
        .spyOn(carsService, 'getCarByLicencePlate')
        .mockResolvedValueOnce(null);
      expect(await carsService.getCarByLicencePlate('59A1-2222')).toBe(null);
    });
  });

  describe('getCarModelById', () => {
    it('should return an array of carModels', async () => {
      jest.spyOn(carsService, 'getCarModelById').mockResolvedValueOnce(null);
      expect(await carsService.getCarModelById('1')).toBeDefined();
    });
  });

  describe('getCarsByCarModel', () => {
    it('should return an array of car', async () => {
      const result2: Car[] = [];
      jest
        .spyOn(carsService, 'getCarsByCarModel')
        .mockResolvedValueOnce(result2);
      expect(await carsService.getCarsByCarModel('1')).toBe(result2);
    });
  });

  describe('registerCarModel', () => {
    it('should return an object of carModels', async () => {
      const result4: CarModelDTO[] = [];
      expect(
        await carsService.registerCarModel({
          name: 'Porsche',
          luggagePayload: 4,
          guestQuantity: 6,
          partnerId: '1',
          photoUrl: 'UNKNOWN',
          standardPricePerKm: 200000,
          country: 'Viet Nam',
          city: 'Ho Chi Minh',
          classId: 'Standard',
          details: [
            {
              licencePlate: '59A3-1236',
              color: 'Red White',
            },
          ],
        }),
      ).toBeDefined();
    });
  });

  describe('updateCarModelInformation', () => {
    it('should return an object of carModels', async () => {
      const result4: UpdateCarModelInformationDTO[] = [];
      expect(
        await carsService.updateCarModelInformation({
          vehicleId: '1',
          name: 'Porsche',
          luggagePayload: 4,
          guestQuantity: 6,
          photoUrl: 'UNKNOWN',
          standardPricePerKm: 200000,
          country: 'Viet Nam',
          city: 'Ha Noi',
          classId: 'Standard',
        }),
      ).toBeDefined();
    });
  });

  describe('registerCar', () => {
    it('should not return an object of car', async () => {
      let result5: CarDTO = {
        licencePlate: '59A3-2332',
        color: 'Red',
      };
      jest.spyOn(carsService, 'registerCar').mockResolvedValueOnce(null);
      expect(await carsService.registerCar(result5, '1')).not.toBe(result5);
    });
  });

  describe('getCarsByConditions', () => {
    it('should return an array of car', async () => {
      const getDate = { date: '2021-05-06' };
      jest
        .spyOn(carsService, 'getCarsByConditions')
        .mockResolvedValueOnce(null);
      expect(
        await carsService.getCarsByConditions({
          date: new Date(getDate.date),
          pickUpTime: '20:00:00',
          depCity: 'Ho Chi Minh',
          depCountry: 'Viet Nam',
        }),
      ).toBe(null);
    });
  });

  describe('unRegisterCarModel', () => {
    it('should not return an object of car', async () => {
      const result6: CarModel[] = [];
      jest.spyOn(carsService, 'unRegisterCarModel').mockResolvedValueOnce(null);
      expect(await carsService.unRegisterCarModel('1')).toBe(null);
    });
  });

  describe('getInformationBooked', () => {
    it('should return an array of carModels', async () => {
      let a = json.length > 0;
      jest.spyOn(carsService, 'getInformationBooked').mockResolvedValueOnce(a);
      expect(
        await carsService.getInformationBooked(
          '79A0A4A7-487A-4F3C-832B-6F5DE4A5AC3A',
        ),
      ).toBe(a);
    });
  });
});
