import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Train } from '../models/train.model';
import { JourneysModule } from '../journeys/journeys.module';
import { SchedulesModule } from '../schedules/schedules.module';
import { TrainModule } from './train.module';
import { TrainService } from './train.service';
import { json } from 'sequelize';

describe('TrainService', () => {
  let trainService: TrainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainService],
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
    }).compile();

    trainService = module.get<TrainService>(TrainService);
  });

  describe('getTrainsByPartner', () => {
    it('should return an array of Train', async () => {
      const result1: Train[] = [];
      jest.spyOn(trainService, 'getTrainsByPartner').mockResolvedValue(result1);
      expect(await trainService.getTrainsByPartner('1')).toBe(result1);
    });
  });

  describe('getTrainByJourney', () => {
    it('should return an array of Train', async () => {
      jest.spyOn(trainService, 'getTrainByJourney').mockResolvedValueOnce(null);
      expect(await trainService.getTrainByJourney('1')).toBeDefined();
    });
  });

  describe('registerTrain', () => {
    it('should return an object of Train', async () => {
      expect(
        await trainService.registerTrain({
          name: 'SkyBus',
          partnerId: '1',
          photoUrl: 'UNKNOWN',
          ticketPrice: 200000,
          classId: 'Standard',
        }),
      ).toBeDefined();
    });
  });

  describe('updateTrainInformation', () => {
    it('should return an object of Train', async () => {
      expect(
        await trainService.updateTrainInformation({
          vehicleId: '1',
          name: 'Porsche',
          photoUrl: 'UNKNOWN',
          ticketPrice: 200000,
          classId: 'Standard',
        }),
      ).toBeDefined();
    });
  });

  describe('getTicketInformation', () => {
    it('should return an array of Schedule', async () => {
      let a = json.length > 0;
      jest.spyOn(trainService, 'getTicketInformation').mockResolvedValueOnce(a);
      expect(await trainService.getTicketInformation('1')).toBe(a);
    });
  });

  describe('unregisterTrain', () => {
    it('should not return an object of Train', async () => {
      jest.spyOn(trainService, 'unregisterTrain').mockResolvedValueOnce(null);
      expect(await trainService.unregisterTrain('1')).toBeDefined();
    });
  });
});
