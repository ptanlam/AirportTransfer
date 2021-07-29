import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EditFlightDTO } from 'src/dtos/edit-flight.dto';
import { RegisterFlightDTO } from 'src/dtos/register-flight.dto';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  private readonly logger = new Logger('FlightsController');

  constructor(private flightsService: FlightsService) {}

  @MessagePattern('get_flights_by_partner')
  async getFlightsByPartner(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const flights = await this.flightsService.getFlightsByPartner(partnerId);
      return { flights };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_flight_by_id')
  async getFlightById(@Payload() flightId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const flight = await this.flightsService.getFlightById(flightId);
      return flight;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('register_flight')
  async postFlight(
    @Payload() registerFlightDTO: RegisterFlightDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const flight = await this.flightsService.registerFlight(
        registerFlightDTO,
      );
      return { vehicle: flight };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('update_flight')
  async patchFlight(
    @Payload() editFlightDTO: EditFlightDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const flight = await this.flightsService.updateFlight(editFlightDTO);
      return { vehicle: flight };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
