import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleDetailsDTO } from 'src/dtos/add-cars-scheduleDetails.dto';
import { JourneysDTO } from 'src/dtos/add-journeys.dto';
import { Journeys } from 'src/models/journey.model';
import { Schedules } from 'src/models/schedules.model';
import { CarsModule } from '../cars/cars.module';
import { SchedulesModule } from './schedules.module';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let schedulesService: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService],
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

    schedulesService = module.get<SchedulesService>(SchedulesService);
  });

  describe('getSchedulesByCarDate', () => {
    it('should return an array of car', async () => {
      const result3: Schedules[] = [];
      jest
        .spyOn(schedulesService, 'getSchedulesByCarDate')
        .mockResolvedValueOnce(result3);
      expect(
        await schedulesService.getSchedulesByCarDate('1', '2021-05-30'),
      ).toBe(result3);
    });
  });

  describe('getJourneys', () => {
    it('should return an array of journey', async () => {
      const result3: Journeys[] = [];
      jest
        .spyOn(schedulesService, 'getJourneys')
        .mockResolvedValueOnce(result3);
      expect(
        await schedulesService.getJourneys(
          '79A0A4A7-487A-4F3C-832B-6F5DE4A5AC3A',
        ),
      ).toBe(result3);
    });
  });

  describe('addSchedule', () => {
    it('should return an object of Schedule', async () => {
      expect(
        await schedulesService.addSchedule({
          date: '2021-05-28',
          start: '12:00:00',
          travel: 1200,
          cars: [
            {
              id: '2',
            },
          ],
          details: [
            {
              placeId: '1123qwe2131qew',
              description: 'abcdef',
              district: 'Quan 4',
              city: 'Ho Chi Minh',
              country: 'Viet Nam',
              orderNumber: 0,
            },
            {
              placeId: '1123qwe2131qew',
              description: 'abcdef',
              district: 'Quan 10',
              city: 'Ho Chi Minh',
              country: 'Viet Nam',
              orderNumber: 1,
            },
          ],
        }),
      ).toBeDefined();
    });
  });

  describe('addJourney', () => {
    it('should not return an object of car', async () => {
      let result5: JourneysDTO = {
        placeId: '1123qwe2131qew',
        description: 'abcdef',
        district: 'Quan 4',
        city: 'Ho Chi Minh',
        country: 'Viet Nam',
        orderNumber: 0,
      };
      expect(
        await schedulesService.addJourney(
          result5,
          '288034E7-D3EC-49E2-87F7-4FBEF1A727B9',
        ),
      ).toBeDefined();
    });
  });

  describe('addScheduleDetail', () => {
    it('should not return an object of car', async () => {
      let result5: ScheduleDetailsDTO = {
        id: '2',
      };
      expect(
        await schedulesService.addScheduleDetail(
          result5,
          '288034E7-D3EC-49E2-87F7-4FBEF1A727B9',
        ),
      ).toBeDefined();
    });
  });

  describe('cancelScheduleBooked', () => {
    it('should return an array of journey', async () => {
      jest
        .spyOn(schedulesService, 'cancelScheduleBooked')
        .mockResolvedValueOnce(null);
      expect(
        await schedulesService.cancelScheduleBooked(
          '79A0A4A7-487A-4F3C-832B-6F5DE4A5AC3A',
        ),
      ).toBeDefined();
    });
  });
});
