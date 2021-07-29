import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterStationDTO } from 'src/dtos/register-station.dto';
import { JourneyDetails } from 'src/models/journey-details.model';
import { BusesModule } from '../buses/buses.module';
import { Journey } from '../models/journey.model';
import { SchedulesModule } from '../schedules/schedules.module';
import { JourneysModule } from './journeys.module';
import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  let journeyService: JourneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneysService],
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
        BusesModule,
        JourneysModule,
        SchedulesModule,
      ],
    }).compile();

    journeyService = module.get<JourneysService>(JourneysService);
  });

  describe('getJourneysByBus', () => {
    it('should return an array of Journey', async () => {
      const result1: Journey[] = [];
      jest.spyOn(journeyService, 'getJourneysByBus').mockResolvedValue(result1);
      expect(await journeyService.getJourneysByBus('1')).toBe(result1);
    });
  });

  describe('addJourney', () => {
    it('should return an object of Journey', async () => {
      const data = {
        vehicleId: '64C2DECB-0F9F-4040-916D-C2439AF55F32',
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

  describe('addJourneyDetails', () => {
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
        await journeyService.addJourneyDetails(
          result5,
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
        ),
      ).toBeDefined();
    });
  });
});
