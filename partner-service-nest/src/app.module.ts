import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthModule } from './health/health.module';
import { PartnersModule } from './partners/partners.module';
import { PoliciesModule } from './policies/policies.module';
import { ClassesModule } from './classes/classes.module';

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
    HealthModule,
    PartnersModule,
    PoliciesModule,
    ClassesModule,
  ],
})
export class AppModule {}
