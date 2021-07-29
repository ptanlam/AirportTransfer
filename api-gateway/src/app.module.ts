import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { RolesGuard } from "./auth/guards/role.guard";
import { HealthModule } from "./health/health.module";
import { BookingModule } from "./services/booking/booking.module";
import { BusesModule } from "./services/buses/buses.module";
import { CarsModule } from "./services/cars/cars.module";
import { FlightsModule } from "./services/flights/flights.module";
import { PartnersModule } from "./services/partners/partners.module";
import { TrainsModule } from "./services/trains/trains.module";
import { UsersModule } from "./services/users/users.module";
import { EmailModule } from "./utils/email/email.module";
import { FilesService } from "./utils/files/files.service";
import { AppGateway } from "./app.gateway";

@Module({
  imports: [
    FlightsModule,
    HealthModule,
    BusesModule,
    AuthModule,
    PartnersModule,
    UsersModule,
    EmailModule,
    CarsModule,
    BookingModule,
    TrainsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
  ],
  providers: [
    FilesService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppGateway,
  ],
})
export class AppModule {}
