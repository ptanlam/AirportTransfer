import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { timeout } from "rxjs/operators";
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "src/common/enums/role.enum";
import { storage } from "src/configs/storage.config";
import { FilesService } from "src/utils/files/files.service";
import { AddScheduleDTO } from "./dtos/add-schedule.dto";
import { EditFlightDTO } from "./dtos/edit-flight.dto";
import { GetSchedulesByConditionsDTO } from "./dtos/get-schedules-by-conditions.dto";
import { GetTicketsForBookingDTO } from "./dtos/get-ticket-for-booking.dto";
import { RegisterFlightDTO } from "./dtos/register-flight.dto";

@Controller("flights")
export class FlightsController {
  private readonly logger = new Logger("FlightsController");

  constructor(
    @Inject("FLIGHT_SERVICE") private readonly client: ClientProxy,
    @Inject("PARTNER_SERVICE") private readonly partnerClient: ClientProxy,
    private filesService: FilesService
  ) {}

  @Public()
  @Get("fullSearch")
  async getFlightsByConditions(
    @Query() getSchedulesByConditions: GetSchedulesByConditionsDTO
  ) {
    const today = new Date().setHours(0, 0, 0, 0);
    if (new Date(getSchedulesByConditions.date).setHours(0, 0, 0, 0) < today)
      return { tickets: [] };
    try {
      const schedules = await this.client
        .send("get_schedules_by_conditions", getSchedulesByConditions)
        .pipe(timeout(15000))
        .toPromise();
      const tickets = await Promise.all(
        schedules.map(async (schedule) => {
          const flight = await this.client
            .send("get_flight_by_id", schedule.flightId)
            .pipe(timeout(15000))
            .toPromise();
          const { partnerId } = flight;
          const partner = await this.partnerClient
            .send("get_partner_by_id", partnerId)
            .pipe(timeout(15000))
            .toPromise();
          return { schedule, flight, partner };
        })
      );
      return { tickets };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Get()
  async getFlightsByPartner(@Query("partnerId") partnerId: string) {
    try {
      const flights = await this.client
        .send("get_flights_by_partner", partnerId)
        .pipe(timeout(15000))
        .toPromise();
      return flights;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Patch("booking")
  async getTicketsForBooking(
    @Body()
    data: {
      bookingDetails: GetTicketsForBookingDTO;
      scheduleId: string;
    }
  ) {
    try {
      const tickets = await this.client
        .send("get_tickets_for_booking", data)
        .pipe(timeout(15000))
        .toPromise();
      if (tickets.length === 0) {
        throw new HttpException("Out of tickets!", HttpStatus.BAD_REQUEST);
      }
      return { tickets };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @UseInterceptors(FileInterceptor("photo", { storage }))
  @Post()
  async postFlight(
    @Body() registerFlightDTO: RegisterFlightDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      registerFlightDTO.photoUrl = photo.filename;
      const flight = await this.client
        .send("register_flight", registerFlightDTO)
        .pipe(timeout(15000))
        .toPromise();
      return flight;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.guest)
  @Get("schedules/exchange")
  async getScheduleDetailsByPartnerAndConditions(
    @Query() getSchedulesByConditions: GetSchedulesByConditionsDTO
  ) {
    const today = new Date().setHours(0, 0, 0, 0);
    if (new Date(getSchedulesByConditions.date).setHours(0, 0, 0, 0) < today)
      return { schedules: [] };
    try {
      const flights = await this.client
        .send("get_schedules_by_partner_conditions", getSchedulesByConditions)
        .pipe(timeout(15000))
        .toPromise();
      const flightsWithPartners = await Promise.all(
        flights.map(async (flight) => {
          const partner = await this.partnerClient
            .send("get_partner_by_id", flight.partnerId)
            .pipe(timeout(15000))
            .toPromise();
          return { ...flight, partner };
        })
      );
      return { flights: flightsWithPartners };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Get("schedules")
  async getSchedules(
    @Query("vehicleId") vehicleId: string,
    @Query("date") date: Date
  ) {
    try {
      const schedules = await this.client
        .send("get_schedules_by_flight_and_date", { vehicleId, date })
        .pipe(timeout(15000))
        .toPromise();
      return schedules;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("schedules")
  async addSchedule(@Body() addScheduleDTO: AddScheduleDTO) {
    try {
      const schedule = await this.client
        .send("add_schedule", addScheduleDTO)
        .pipe(timeout(15000))
        .toPromise();
      return schedule;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @UseInterceptors(FileInterceptor("ticketsFile"))
  @Post("tickets")
  async addTickets(
    @Query("scheduleId") scheduleId: string,
    @Query("numberOfSeats") numberOfSeats: number,
    @UploadedFile() ticketsFile: Express.Multer.File
  ) {
    try {
      const tickets = await this.filesService
        .readExcelFile(ticketsFile.buffer, numberOfSeats)
        .map((ticket) => ({ ...ticket, scheduleId }));
      const addedTickets = await this.client
        .send("add_tickets", tickets)
        .pipe(timeout(15000))
        .toPromise();
      return addedTickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch("schedules/:scheduleId/manipulate")
  async manipulateSchedule(
    @Param("scheduleId") scheduleId: string,
    @Query("mode") mode: string
  ) {
    try {
      const [schedule, result] = await this.client
        .send("manipulate_schedule", { scheduleId, mode })
        .pipe(timeout(15000))
        .toPromise();
      return { schedule: schedule[0] };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Delete("schedules/:scheduleId")
  async cancelSchedule(@Param("scheduleId") scheduleId: string) {
    try {
      const [schedule, result] = await this.client
        .send("cancel_schedule", scheduleId)
        .pipe(timeout(15000))
        .toPromise();
      if (result === 1)
        throw new HttpException(
          "Can not cancel this schedule because it still has tickets not being refunded.",
          HttpStatus.BAD_REQUEST
        );
      return { schedule: schedule[0] };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Public()
  @Patch("tickets/:ticketId/revoke")
  async revokeTicket(@Param("ticketId") ticketId: string) {
    try {
      const [ticket, result] = await this.client
        .send("revoke_ticket", ticketId)
        .pipe(timeout(15000))
        .toPromise();
      if (result === 1)
        throw new HttpException(
          "Cannot revoke ticket!",
          HttpStatus.BAD_REQUEST
        );
      return { ticket: ticket[0] };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @UseInterceptors(FileInterceptor("photo", { storage }))
  @Patch(":vehicleId")
  async patchFlight(
    @Param("vehicleId") vehicleId: string,
    @Body() editFlightDTO: EditFlightDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      const updatedInformation = new EditFlightDTO(
        editFlightDTO.name,
        editFlightDTO.guestQuantity,
        photo.filename
      );
      const flight = await this.client
        .send("update_flight", { ...updatedInformation, vehicleId })
        .pipe(timeout(15000))
        .toPromise();
      return flight;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
