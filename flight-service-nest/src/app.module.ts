import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlightsModule } from './flights/flights.module';
import { HealthModule } from './health/health.module';
import { JourneysModule } from './journeys/journeys.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
    FlightsModule,
    HealthModule,
    JourneysModule,
    SchedulesModule,
    TicketsModule,
  ],
})
export class AppModule {}
