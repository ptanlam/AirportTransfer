import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppGateway } from 'src/app.gateway';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UsersService } from 'src/services/users/users.service';
import { EmailService } from 'src/utils/email/email.service';
import { FilesService } from 'src/utils/files/files.service';
import { PartnersController } from './partners.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRY,
        algorithm: 'HS256',
        issuer: process.env.ISSUER,
      },
    }),
    ClientsModule.register([
      {
        name: 'PARTNER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'partners_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.MQ_URL],
          queue: 'users_queue',
          noAck: false,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PartnersController],
  providers: [
    FilesService,
    UsersService,
    EmailService,
    AuthService,
    JwtStrategy,
    AppGateway,
  ],
})
export class PartnersModule {}
