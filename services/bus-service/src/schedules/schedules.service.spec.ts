import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { json } from 'sequelize';
import { AddScheduleDTO } from 'src/dtos/add-schedule.dto';
import { GetSchedulesByConditionsDTO } from 'src/dtos/get-schedules-by-conditions.dto';
import { FilteredSchedule } from 'src/models/filtered-schedule.model';
import { ScheduleDetails } from 'src/models/schedule-details.model';
import { BusesModule } from '../buses/buses.module';
import { JourneysModule } from '../journeys/journeys.module';
import { SchedulesModule } from './schedules.module';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let ScheduleService: SchedulesService;

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
        BusesModule,
        JourneysModule,
        SchedulesModule,
      ],
    }).compile();

    ScheduleService = module.get<SchedulesService>(SchedulesService);
  });

  describe('addSchedule', () => {
    it('should return an object of Schedule', async () => {
      const data: AddScheduleDTO = {
        date: '2021-05-30',
        startTime: '06:00:00',
        endTime: '07:00:00',
        gap: '3600',
        numberOfVehicles: 100,
        journeyId: 'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
      };
      expect(await ScheduleService.addSchedule(data)).toBeDefined();
    });
  });

  describe('manipulateScheduleDetails', () => {
    it('should return an object of Schedule', async () => {
      const data = {
        scheduleDetailId: '1',
      };
      expect(
        await ScheduleService.manipulateScheduleDetails(
          data.scheduleDetailId,
          'Deactivate',
        ),
      ).toBeUndefined();
    });
  });

  describe('manipulateScheduleDetails', () => {
    it('should return an object of Schedule', async () => {
      const data = {
        scheduleDetailId: '1',
      };
      expect(
        await ScheduleService.manipulateScheduleDetails(
          data.scheduleDetailId,
          'Cancel',
        ),
      ).toBeUndefined();
    });
  });

  describe('getScheduleByJourneyAndDate', () => {
    it('should not return an array of Schedule', async () => {
      jest
        .spyOn(ScheduleService, 'getScheduleByJourneyAndDate')
        .mockResolvedValue(null);
      expect(
        await ScheduleService.getScheduleByJourneyAndDate(
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
          '2021-05-30',
        ),
      ).toBe(null);
    });
  });

  describe('getScheduleById', () => {
    it('should not return an array of Schedule', async () => {
      jest.spyOn(ScheduleService, 'getScheduleById').mockResolvedValue(null);
      expect(await ScheduleService.getScheduleById('1')).toBe(null);
    });
  });

  describe('getSchedulesByConditions', () => {
    it('should not return an array of Schedule', async () => {
      const result2: FilteredSchedule[] = [];
      let data: GetSchedulesByConditionsDTO = {
        depDistrict: 'District 1',
        depCity: 'Ho Chi Minh City',
        depCountry: 'Vietnam',
        desDistrict: 'District 10',
        desCity: 'Ho Chi Minh City',
        desCountry: 'Vietnam',
        date: '2021-05-30',
        pickUpTime: '06:00:00',
        numberOfPax: 2,
      };
      jest
        .spyOn(ScheduleService, 'getSchedulesByConditions')
        .mockResolvedValue(result2);
      expect(await ScheduleService.getSchedulesByConditions(data)).toBe(
        result2,
      );
    });
  });

  describe('getScheduleDetailsBySchedule', () => {
    it('should not return an array of Schedule', async () => {
      const data: ScheduleDetails[] = [];
      jest
        .spyOn(ScheduleService, 'getScheduleDetailsBySchedule')
        .mockResolvedValue(data);
      expect(
        await ScheduleService.getScheduleDetailsBySchedule(
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
          '06:00:00',
        ),
      ).toBe(data);
    });
  });

  describe('getTicketInformation', () => {
    it('should return an array of Schedule', async () => {
      let a = json.length > 0;
      jest
        .spyOn(ScheduleService, 'getTicketInformation')
        .mockResolvedValueOnce(a);
      expect(await ScheduleService.getTicketInformation('1')).toBe(a);
    });
  });

  describe('revokeTickets', () => {
    it('should return an array of Schedule', async () => {
      jest.spyOn(ScheduleService, 'revokeTickets').mockReturnValueOnce(null);
      expect(await ScheduleService.revokeTickets('1', 1)).toBe(null);
    });
  });
});
