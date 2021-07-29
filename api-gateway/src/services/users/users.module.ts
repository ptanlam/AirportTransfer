import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UsersService } from './users.service';

@Module({
  imports: [
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
      signOptions: { expiresIn: process.env.EXPIRY },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
