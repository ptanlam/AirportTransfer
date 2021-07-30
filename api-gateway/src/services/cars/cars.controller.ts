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
  Req,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { timeout } from "rxjs/operators";
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "src/common/enums/role.enum";
import { storage } from "src/configs/storage.config";
import { FilesService } from "src/utils/files/files.service";
import { AddCarsDTO } from "./dtos/add-cars.dto";
import { CarModelDTO } from "./dtos/car.dto";
import { GetCarsByConditionsDTO } from "./dtos/get-cars-by-condition.dto";
import { SchedulesDTO } from "./dtos/schedule.dto";
import { UpdateCarModelInformationDTO } from "./dtos/update-cars-information.dto";

@Controller("cars")
export class CarsController {
  private logger = new Logger("CarsController");

  constructor(
    @Inject("CAR_SERVICE") private readonly client: ClientProxy,
    @Inject("BOOKING_SERVICE") private readonly bookingClient: ClientProxy,
    private filesService: FilesService
  ) {}

  @Roles(Role.partner)
  @Get()
  async getCarsByPartner(@Query("partnerId") partnerId: string) {
    try {
      const cars = await this.client
        .send("get_cars_by_partner", partnerId)
        .pipe(timeout(15000))
        .toPromise();
      return cars;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post()
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async postCar(
    @Body() carModelDTO: CarModelDTO,
    @UploadedFile() photo: Express.Multer.File,
    @Req() request: Request
  ) {
    try {
      const { details } = carModelDTO;
      carModelDTO.photoUrl = `http://${request.headers.host}/${photo.filename}`;
      carModelDTO.details = JSON.parse(details);
      const car = await this.client
        .send("register_car_model_and_cars", carModelDTO)
        .pipe(timeout(15000))
        .toPromise();
      return car;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Post("add")
  async addCars(@Body() addCarsDTO: AddCarsDTO) {
    try {
      const cars = await this.client
        .send("add_cars", addCarsDTO)
        .pipe(timeout(15000))
        .toPromise();
      return cars;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Post("schedules")
  async postSchedules(@Body() schedulesDTO: SchedulesDTO) {
    try {
      const schedule = await this.client
        .send("add_schedule", schedulesDTO)
        .pipe(timeout(15000))
        .toPromise();
      return schedule;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Get("fullSearch")
  async getCarsByConditions(
    @Query() getCarsByConditionsDTO: GetCarsByConditionsDTO
  ) {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      if (new Date(getCarsByConditionsDTO.date).setHours(0, 0, 0, 0) < today)
        return { vehicles: [] };
      const cars = await this.client
        .send("get_cars_by_conditions", getCarsByConditionsDTO)
        .pipe(timeout(15000))
        .toPromise();
      return cars;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Public()
  @Get("fullSearch/exchange")
  async getCarsByConditionsAndPartner(
    @Query("partnerId") partnerId: string,
    @Query() getCarsByConditionsDTO: GetCarsByConditionsDTO
  ) {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      if (new Date(getCarsByConditionsDTO.date).setHours(0, 0, 0, 0) < today)
        return { vehicles: [] };
      const cars = await this.client
        .send("get_cars_by_conditions_and_partner", {
          partnerId,
          getCarsByConditionsDTO,
        })
        .pipe(timeout(15000))
        .toPromise();
      return cars;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Public()
  @Get("schedules")
  async getSchedules(
    @Query("carId") carId: string,
    @Query("date") date: string
  ) {
    try {
      const schedule = await this.client
        .send("get_schedules_by_car_and_date", { carId, date })
        .pipe(timeout(15000))
        .toPromise();
      return schedule;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete("unregisterCar")
  async unregisterCar(@Query("carId") carId: string) {
    try {
      const car = await this.client
        .send("unregister_car", carId)
        .pipe(timeout(10000))
        .toPromise();
      if (!car)
        throw new HttpException(
          `Can not unregister this car id: ${carId}, because it has some ` +
            `schedules without happened or does not exist this car!`,
          HttpStatus.BAD_REQUEST
        );
      return car;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Public()
  @Delete("schedules/:scheduleId/remove")
  async removeScheduleDetail(@Param("scheduleId") scheduleId: string) {
    try {
      const remove = await this.client
        .send("remove_schedule_booked", scheduleId)
        .pipe(timeout(15000))
        .toPromise();
      if (!remove || scheduleId == null)
        throw new HttpException(
          `Something was wrong....`,
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

  @Public()
  @Patch("schedules/:scheduleId/cancel")
  async cancelScheduleBooked(@Param("scheduleId") scheduleId: string) {
    try {
      const cancel = await this.client
        .send("cancel_schedule_booked", scheduleId)
        .pipe(timeout(15000))
        .toPromise();
      if (!cancel || scheduleId == null)
        throw new HttpException(
          `Something was wrong....`,
          HttpStatus.BAD_REQUEST
        );
      const oldTicketContacts = await this.bookingClient
        .send("get_ticket_by_scheduleDetailId", scheduleId)
        .pipe(timeout(15000))
        .toPromise();

      const contacts = await Promise.all(
        oldTicketContacts.map(async (oldTicketContact) => {
          const oldTicketId = oldTicketContact.id;
          const refundStatus = await this.bookingClient
            .send("refund_ticket", { oldTicketId, lostPercentage: 0 })
            .toPromise();
          return {
            name: oldTicketContact.contactName,
            email: oldTicketContact.email,
            phoneNumber: oldTicketContact.phoneNumber,
            ...refundStatus,
          };
        })
      );
      return { scheduleId, contacts };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.guest)
  @Patch("schedules/:scheduleId/activate")
  async activateScheduleBooked(@Param("scheduleId") scheduleId: string) {
    try {
      const activate = await this.client
        .send("activate_schedule_booked", scheduleId)
        .pipe(timeout(15000))
        .toPromise();
      if (!activate || scheduleId == null)
        throw new HttpException(
          `Something was wrong....`,
          HttpStatus.BAD_REQUEST
        );
      return { scheduleId };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  @Roles(Role.partner)
  @Get("licencePlates/:licencePlate")
  async getCarByLicencePlate(@Param("licencePlate") licencePlate: string) {
    try {
      const car = await this.client
        .send("get_car_by_licence_plate", licencePlate)
        .pipe(timeout(15000))
        .toPromise();
      return { exists: !!Object.keys(car).length };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch(":vehicleId")
  @UseInterceptors(FileInterceptor("photo", { storage }))
  async updateCar(
    @Param("vehicleId") vehicleId: string,
    @Body() updateCarModelInformationDTO: UpdateCarModelInformationDTO,
    @UploadedFile() photo: Express.Multer.File,
    @Req() request: Request
  ) {
    try {
      const updatedInformation = new UpdateCarModelInformationDTO(
        updateCarModelInformationDTO.name,
        updateCarModelInformationDTO.luggagePayload,
        updateCarModelInformationDTO.guestQuantity,
        `http://${request.headers.host}/${photo.filename}`,
        updateCarModelInformationDTO.standardPricePerKm,
        updateCarModelInformationDTO.country,
        updateCarModelInformationDTO.city,
        updateCarModelInformationDTO.classId
      );
      const carModel = await this.client
        .send("update_car_model", { ...updatedInformation, vehicleId })
        .pipe(timeout(15000))
        .toPromise();
      return carModel;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Delete(":id")
  async unregisterCarModel(@Param("id") id: string) {
    try {
      const carModel = await this.client
        .send("unregister_car_model", id)
        .pipe(timeout(15000))
        .toPromise();
      if (!Object.entries(carModel).length)
        throw new HttpException(
          `Can not unregister this car ${id} because it has some ` +
            `schedules without happened`,
          HttpStatus.BAD_REQUEST
        );
      return carModel;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
