import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/services/users/users.service';
import { EmailService } from 'src/utils/email/email.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    ClientsModule.register([
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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRY,
        algorithm: 'HS256',
        issuer: process.env.ISSUER,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    EmailService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
