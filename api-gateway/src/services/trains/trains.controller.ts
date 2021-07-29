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
import { BookTrainDto } from "./dtos/create-book.dtos";
import { GetSchedulesByConditionsDTO } from "./dtos/get-schedules-by-conds.dto";
import { RegisterJourneyDTO } from "./dtos/register-journey.dto";
import { TrainDTO } from "./dtos/train.dto";
import { UpdateTrainDTO } from "./dtos/update-train.dto";

@Controller("trains")
export class TrainsController {
  private readonly logger = new Logger("TrainController");

  constructor(
    @Inject("TRAIN_SERVICE") private readonly client: ClientProxy,
    @Inject("PARTNER_SERVICE") private readonly partnerClient: ClientProxy,
    private filesService: FilesService
  ) {}

  @Roles(Role.partner)
  @Get()
  async getTrainsByPartner(@Query("partnerId") partnerId: string) {
    try {
      const trains = await this.client
        .send("get_trains_by_partner", partnerId)
        .toPromise();
      return trains;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post()
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async postTrain(
    @Body() registerTrainDTO: TrainDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      registerTrainDTO.photoUrl = photo.filename;
      const train = await this.client
        .send("post_train", registerTrainDTO)
        .pipe(timeout(15000))
        .toPromise();
      const vehicleClass = await this.partnerClient
        .send("get_class_by_id", train.classId)
        .pipe(timeout(15000))
        .toPromise();
      return { vehicle: { ...train, class: vehicleClass.name } };
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

  @Public()
  @Get("fullSearch")
  async getTrainByConditions(
    @Query() getSchedulesByConditions: GetSchedulesByConditionsDTO
  ) {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      if (new Date(getSchedulesByConditions.date).setHours(0, 0, 0, 0) < today)
        return { schedules: [] };
      const schedules = await this.client
        .send("get_trains_by_conditions", getSchedulesByConditions)
        .pipe(timeout(15000))
        .toPromise();
      const fullSchedules = await Promise.all(
        schedules.map(async (schedule) => {
          const partner = await this.partnerClient
            .send("get_partner_by_id", schedule.train.partnerId)
            .pipe(timeout(15000))
            .toPromise();
          const vehicleClass = await this.partnerClient
            .send("get_class_by_id", schedule.train.classId)
            .pipe(timeout(15000))
            .toPromise();
          return { ...schedule, partner, vehicleClass };
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
  async bookTrain(@Query() bookTrainDto: BookTrainDto) {
    try {
      const isBookable = await this.client
        .send("book_train", bookTrainDto)
        .pipe(timeout(15000))
        .toPromise();

      if (!isBookable)
        throw new HttpException("Hết vé rồi nha", HttpStatus.BAD_REQUEST);
      return isBookable;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Post("schedules")
  async postSchedule(@Body() addScheduleDTO: AddScheduleDTO) {
    try {
      const schedule = await this.client
        .send("add_schedule", addScheduleDTO)
        .pipe(timeout(5000))
        .toPromise();
      return schedule;
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
        .send("get_journeys_by_train", vehicleId)
        .pipe(timeout(15000))
        .toPromise();
      return journeys;
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
        .pipe(timeout(5000))
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
      const schedules = await this.client
        .send("get_schedule_details_by_partner_and_conditions", {
          partnerId,
          getSchedulesByConditionsDTO,
        })
        .pipe(timeout(15000))
        .toPromise();
      return schedules;
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
        .send("cancel_book", {
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
      return result;
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
      const result = await this.client
        .send(`${action}_journey`, journeyId)
        .pipe(timeout(15000))
        .toPromise();
      if (result.journeys[0].stillHasSchedule) {
        throw new HttpException(
          "This vehicle still has active journey, " +
            "please deactivate all vehicle's journeys " +
            "before unregister",
          HttpStatus.BAD_REQUEST
        );
      }
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch(":vehicleId")
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async patchTrain(
    @Param("vehicleId") vehicleId: string,
    @Body() editTrainDTO: UpdateTrainDTO,
    @UploadedFile() photo: Express.Multer.File
  ) {
    try {
      const updatedInformation = new UpdateTrainDTO(
        editTrainDTO.name,
        editTrainDTO.ticketPrice,
        photo.filename,
        editTrainDTO.classId
      );

      const train = await this.client
        .send("patch_train", { ...updatedInformation, vehicleId })
        .pipe(timeout(15000))
        .toPromise();
      const vehicleClass = await this.partnerClient
        .send("get_class_by_id", train.classId)
        .pipe(timeout(15000))
        .toPromise();
      return { vehicle: { ...train, class: vehicleClass.name } };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete(":vehicleId")
  async unregisterTrain(@Param("vehicleId") vehicleId: string) {
    try {
      const result = await this.client
        .send("unregister_train", vehicleId)
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
