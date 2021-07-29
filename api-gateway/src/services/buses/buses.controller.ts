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
import { BookBusDTO } from "./dtos/book-bus.dto";
import { EditBusDTO } from "./dtos/edit-bus.dto";
import { GetSchedulesByConditionsDTO } from "./dtos/get-schedules-by-conds.dto";
import { RegisterBusDTO } from "./dtos/register-bus.dto";
import { RegisterJourneyDTO } from "./dtos/register-journey.dto";

@Controller("buses")
export class BusesController {
  private readonly logger = new Logger("BusController");

  constructor(
    @Inject("BUS_SERVICE") private readonly client: ClientProxy,
    @Inject("PARTNER_SERVICE") private readonly partnerClient: ClientProxy,
    private filesService: FilesService
  ) {}

  @Public()
  @Get("fullSearch")
  async getBusesByConditions(
    @Query() getSchedulesByConditions: GetSchedulesByConditionsDTO
  ) {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      if (new Date(getSchedulesByConditions.date).setHours(0, 0, 0, 0) < today)
        return { schedules: [] };
      const schedules = await this.client
        .send("get_buses_by_conditions", getSchedulesByConditions)
        .pipe(timeout(15000))
        .toPromise();
      const fullSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const { partnerId, ...rest } = schedule;
          const partner = await this.partnerClient
            .send("get_partner_by_id", partnerId)
            .pipe(timeout(15000))
            .toPromise();
          const vehicleClass = await this.partnerClient
            .send("get_class_by_id", rest.bus.classId)
            .pipe(timeout(15000))
            .toPromise();
          return { ...rest, partner, vehicleClass };
        })
      );
      return { schedules: fullSchedules };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Patch("booking")
  async bookBus(@Query() bookBusDTO: BookBusDTO) {
    try {
      const result = await this.client
        .send("book_bus", bookBusDTO)
        .pipe(timeout(15000))
        .toPromise();
      if (!result)
        throw new HttpException("Out of tickets!", HttpStatus.BAD_REQUEST);
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Get()
  async getBusesByPartner(@Query("partnerId") partnerId: string) {
    try {
      const buses = await this.client
        .send("get_buses_by_partner", partnerId)
        .pipe(timeout(15000))
        .toPromise();
      return buses;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post()
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async postBus(
    @Body() registerBusDTO: RegisterBusDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      registerBusDTO.photoUrl = photo.filename;
      const bus = await this.client
        .send("register_bus", registerBusDTO)
        .pipe(timeout(15000))
        .toPromise();
      const vehicleClass = await this.partnerClient
        .send("get_class_by_id", bus.classId)
        .pipe(timeout(15000))
        .toPromise();
      return { vehicle: { ...bus, class: vehicleClass.name } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Get("journeys")
  async getJourneys(@Query("vehicleId") vehicleId: string) {
    try {
      const journeys = await this.client
        .send("get_journeys_by_bus", vehicleId)
        .pipe(timeout(15000))
        .toPromise();
      return journeys;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("journeys")
  async postJourney(@Body() registerJourneyDTO: RegisterJourneyDTO) {
    try {
      const journey = await this.client
        .send("register_journey", registerJourneyDTO)
        .pipe(timeout(15000))
        .toPromise();
      return journey;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Get("schedules")
  async getSchedulesByJourneyAndDate(
    @Query("journeyId") journeyId: string,
    @Query("date") date: string
  ) {
    try {
      const schedule = await this.client
        .send("get_schedule_by_journey_and_date", { journeyId, date })
        .pipe(timeout(15000))
        .toPromise();
      return schedule;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("schedules")
  async postSchedule(@Body() addScheduleDTO: AddScheduleDTO) {
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

  @Roles(Role.guest)
  @Get("schedules/exchange")
  async getScheduleDetailsByPartnerAndConditions(
    @Query("partnerId") partnerId: string,
    @Query() getSchedulesByConditionsDTO: GetSchedulesByConditionsDTO
  ) {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      if (
        new Date(getSchedulesByConditionsDTO.date).setHours(0, 0, 0, 0) < today
      )
        return { tickets: [] };
      const tickets = await this.client
        .send("get_schedule_details_by_partner_and_conditions", {
          partnerId,
          getSchedulesByConditionsDTO,
        })
        .pipe(timeout(15000))
        .toPromise();
      const ticketsWithClassName = await Promise.all(
        tickets.map(async (ticket) => {
          const className = await this.partnerClient
            .send("get_class_by_id", ticket.classId)
            .pipe(timeout(15000))
            .toPromise();
          return { ...ticket, className: className.name };
        })
      );
      return { tickets: ticketsWithClassName };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Patch("schedules/details/:scheduleDetailId/revoke")
  async revokeTickets(
    @Param("scheduleDetailId") scheduleDetailId: string,
    @Query("numberOfTickets") numberOfTickets: number
  ) {
    try {
      const result = await this.client
        .send("revoke_tickets", {
          scheduleDetailId,
          numberOfTickets,
        })
        .pipe(timeout(15000))
        .toPromise();
      if (!result)
        throw new HttpException(
          "Exceeding number of tickets",
          HttpStatus.BAD_REQUEST
        );
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Patch("schedules/details/:scheduleDetailId")
  async manipulateScheduleDetails(
    @Query("type") type: string,
    @Param("scheduleDetailId") scheduleDetailId: string
  ) {
    try {
      const detail = await this.client
        .send("manipulate_schedule_details", { scheduleDetailId, type })
        .pipe(timeout(15000))
        .toPromise();
      return detail;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete("schedules/details/:scheduleDetailId")
  async cancelScheduleDetail(
    @Param("scheduleDetailId") scheduleDetailId: string
  ) {
    try {
      const detail = await this.client
        .send("cancel_schedule_detail", scheduleDetailId)
        .pipe(timeout(15000))
        .toPromise();
      return detail;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch("journeys/:journeyId")
  async manipulateJourney(
    @Param("journeyId") journeyId: string,
    @Query("action") action: string
  ) {
    try {
      const journeys = await this.client
        .send(`${action}_journey`, journeyId)
        .pipe(timeout(15000))
        .toPromise();
      return journeys;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch(":vehicleId")
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async patchBus(
    @Param("vehicleId") vehicleId: string,
    @Body() editBusDTO: EditBusDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      const updatedInformation = new EditBusDTO(
        editBusDTO.name,
        editBusDTO.guestQuantity,
        editBusDTO.ticketPrice,
        photo.filename,
        editBusDTO.classId
      );
      const bus = await this.client
        .send("update_bus", { ...updatedInformation, vehicleId })
        .pipe(timeout(15000))
        .toPromise();
      const vehicleClass = await this.partnerClient
        .send("get_class_by_id", bus.classId)
        .pipe(timeout(15000))
        .toPromise();
      return { vehicle: { ...bus, class: vehicleClass.name } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete(":vehicleId")
  async unregisterBus(@Param("vehicleId") vehicleId: string) {
    try {
      const result = await this.client
        .send("unregister_bus", vehicleId)
        .pipe(timeout(15000))
        .toPromise();
      if (!result)
        throw new HttpException(
          "This vehicle still has active journey, " +
            "please deactivate all vehicle's journeys " +
            "before unregister",
          HttpStatus.BAD_REQUEST
        );
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
