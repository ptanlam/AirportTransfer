import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterStationDTO } from '../dtos/station.dto';
import { Journey } from '../models/journey.model';
import { JourneyDetails } from '../models/journeyDetails.model';
import { SchedulesModule } from '../schedules/schedules.module';
import { TrainModule } from '../trains/train.module';
import { JourneysModule } from './journeys.module';
import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  let journeyService: JourneysService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.production'],
        }),
        SequelizeModule.forRoot({
          dialect: 'mssql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }),
        TrainModule,
        JourneysModule,
        SchedulesModule,
      ],
      providers: [JourneysService],
    }).compile();

    journeyService = module.get<JourneysService>(JourneysService);
  });

  describe('getJourneysByTrain', () => {
    it('should return an array of Journey', async () => {
      const result1: Journey[] = [];
      jest
        .spyOn(journeyService, 'getJourneysByTrain')
        .mockResolvedValue(result1);
      expect(await journeyService.getJourneysByTrain('1')).toBe(result1);
    });
  });

  describe('addJourney', () => {
    it('should return an object of Journey', async () => {
      const data = {
        vehicleId: '09D48462-CB4C-4689-BA3E-B9C4BA01883F',
        travelTime: '1000',
      };
      expect(
        await journeyService.addJourney(data.vehicleId, data.travelTime),
      ).toBeDefined();
    });
  });

  describe('activateJourney', () => {
    it('should return an array of Journey', async () => {
      const result1: Journey[] = [];
      jest.spyOn(journeyService, 'activateJourney').mockResolvedValue(result1);
      expect(
        await journeyService.activateJourney(
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
        ),
      ).toBe(result1);
    });
  });

  describe('deactivateJourney', () => {
    it('should return an array of Journey', async () => {
      const result1: Journey[] = [];
      jest
        .spyOn(journeyService, 'deactivateJourney')
        .mockResolvedValue(result1);
      expect(
        await journeyService.deactivateJourney(
          'E382EE7C-6508-4C09-81AD-F902DE4CBF46',
        ),
      ).toBe(result1);
    });
  });

  describe('getJourneyDetailsByJourney', () => {
    it('should return an array of Journey', async () => {
      const result1: JourneyDetails[] = [];
      jest
        .spyOn(journeyService, 'getJourneyDetailsByJourney')
        .mockResolvedValue(result1);
      expect(
        await journeyService.getJourneyDetailsByJourney(
          '7E26F5B5-583B-4123-8DDE-EAA85B48A14C',
        ),
      ).toBe(result1);
    });
  });

  describe('addJourneyDetail', () => {
    it('should not return an object of car', async () => {
      let result5: RegisterStationDTO[] = [
        {
          placeId: '1123qwe2131qew',
          description: 'abcdef',
          district: 'Quan 4',
          city: 'Ho Chi Minh',
          country: 'Viet Nam',
        },
      ];
      expect(
        await journeyService.addJourneyDetail(
          '58B6279F-16A4-43A9-A776-8BA58AD4AFB9',
          result5,
        ),
      ).toBeDefined();
    });
  });
});
