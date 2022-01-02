import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrainModule } from './trains/train.module';
import { HealthModule } from './health/health.module';
import { JourneysModule } from './journeys/journeys.module';
import { TrainController } from './trains/train.controller';
import { TrainService } from './trains/train.service';
import { SchedulesModule } from './schedules/schedules.module';
import { SchedulesService } from './schedules/schedules.service';
import { JourneysService } from './journeys/journeys.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.development'] }),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    HealthModule,
    TrainModule,
    JourneysModule,
    SchedulesModule,
  ],
  controllers: [TrainController],
  providers: [TrainService, SchedulesService, JourneysService],
})
export class AppModule {}
