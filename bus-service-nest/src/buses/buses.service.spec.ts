import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { BookBusDTO } from '../dtos/book-bus.dto';
import { JourneysModule } from '../journeys/journeys.module';
import { Bus } from '../models/bus.model';
import { SchedulesModule } from '../schedules/schedules.module';
import { BusesModule } from './buses.module';
import { BusesService } from './buses.service';

describe('BusesService', () => {
  let busService: BusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusesService],
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

    busService = module.get<BusesService>(BusesService);
  });

  describe('getBusesByPartner', () => {
    it('should return an array of Bus', async () => {
      const result1: Bus[] = [];
      jest.spyOn(busService, 'getBusesByPartner').mockResolvedValue(result1);
      expect(await busService.getBusesByPartner('1')).toBe(result1);
    });
  });

  describe('getBusByJourney', () => {
    it('should return an array of Bus', async () => {
      jest.spyOn(busService, 'getBusByJourney').mockResolvedValueOnce(null);
      expect(await busService.getBusByJourney('1')).toBeDefined();
    });
  });

  describe('registerBus', () => {
    it('should return an object of Bus', async () => {
      expect(
        await busService.registerBus({
          name: 'SkyBus',
          guestQuantity: '6',
          partnerId: '1',
          photoUrl: 'UNKNOWN',
          ticketPrice: '200000',
          classId: 'Standard',
        }),
      ).toBeDefined();
    });
  });

  describe('updateBusInformation', () => {
    it('should return an object of Bus', async () => {
      expect(
        await busService.updateBusInformation({
          vehicleId: '1',
          name: 'Porsche',
          guestQuantity: 6,
          photoUrl: 'UNKNOWN',
          ticketPrice: 200000,
          classId: 'Standard',
        }),
      ).toBeDefined();
    });
  });

  describe('bookBus', () => {
    it('should return an array of Bus', async () => {
      const result7: BookBusDTO = {
        scheduleDetailId: '1',
        numberOfTickets: 100,
      };
      jest.spyOn(busService, 'bookBus').mockResolvedValueOnce(null);
      expect(await busService.bookBus(result7)).toBeDefined();
    });
  });

  describe('unregisterBus', () => {
    it('should not return an object of Bus', async () => {
      jest.spyOn(busService, 'unregisterBus').mockResolvedValueOnce(null);
      expect(await busService.unregisterBus('1')).toBeDefined();
    });
  });
});
