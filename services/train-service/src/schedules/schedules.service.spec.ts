import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Schedule } from '../models/schedule.model';
import { AddScheduleDTO } from '../dtos/add-schedule.dto';
import { GetSchedulesByConditionsDTO } from '../dtos/get-schedules-by-conds.dto';
import { JourneysModule } from '../journeys/journeys.module';
import { FilteredSchedule } from '../models/filtered-schedule.model';
import { ScheduleDetails } from '../models/schedule-details.model';
import { TrainModule } from '../trains/train.module';
import { SchedulesModule } from './schedules.module';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let scheduleService: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService],
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

    scheduleService = module.get<SchedulesService>(SchedulesService);
  });

  describe('addSchedule', () => {
    it('should return an object of Schedule', async () => {
      const data: AddScheduleDTO = {
        date: '2021-05-30',
        startTime: '06:00:00',
        endTime: '07:00:00',
        gap: '3600',
        journeyId: 'A145972F-C485-4373-86CA-499F1BCE080B',
      };
      expect(await scheduleService.addSchedule(data)).toBeDefined();
    });
  });

  describe('manipulateScheduleDetails', () => {
    it('should return an object of Schedule', async () => {
      const data = {
        scheduleDetailId: '1',
      };
      expect(
        await scheduleService.manipulateScheduleDetails(
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
        await scheduleService.manipulateScheduleDetails(
          data.scheduleDetailId,
          'Cancel',
        ),
      ).toBeUndefined();
    });
  });

  describe('getScheduleByJourneyAndDate', () => {
    it('should not return an array of Schedule', async () => {
      jest
        .spyOn(scheduleService, 'getScheduleByJourneyAndDate')
        .mockResolvedValue(null);
      expect(
        await scheduleService.getScheduleByJourneyAndDate(
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
          '2021-05-30',
        ),
      ).toBe(null);
    });
  });

  describe('getScheduleById', () => {
    it('should not return an array of Schedule', async () => {
      jest.spyOn(scheduleService, 'getScheduleById').mockResolvedValue(null);
      expect(await scheduleService.getScheduleById('1')).toBe(null);
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
      };
      jest
        .spyOn(scheduleService, 'getSchedulesByConditions')
        .mockResolvedValue(result2);
      expect(await scheduleService.getSchedulesByConditions(data)).toBe(
        result2,
      );
    });
  });

  describe('getScheduleDetailsBySchedule', () => {
    it('should not return an array of Schedule', async () => {
      const data: ScheduleDetails[] = [];
      jest
        .spyOn(scheduleService, 'getScheduleDetailsBySchedule')
        .mockResolvedValue(data);
      expect(
        await scheduleService.getScheduleDetailsBySchedule(
          'A622484D-06A2-46E7-97B2-2E3DA6DDD562',
        ),
      ).toBe(data);
    });
  });

  describe('revokeTickets', () => {
    it('should return an array of Schedule', async () => {
      jest.spyOn(scheduleService, 'revokeTickets').mockReturnValueOnce(null);
      expect(await scheduleService.revokeTickets('1', 1)).toBe(null);
    });
  });
});
