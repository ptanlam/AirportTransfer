import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { scheduled } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { vehicleType } from 'src/common/enums/vehicleType.enum';
import { SchedulesDTO } from '../cars/dtos/schedule.dto';
import { GetTicketsForBookingDTO } from '../flights/dtos/get-ticket-for-booking.dto';
import { GetPolicyByConditionsDTO } from '../partners/dtos/get-policy-by-conditions.dto';
import { CreateTicketDto } from './dtos/create-ticket.dto';

@Controller('booking')
export class BookingController {
  private readonly logger = new Logger('BookingController');
  constructor(
    @Inject('BOOKING_SERVICE') private readonly client: ClientProxy,
    @Inject('CARS_SERVICE') private readonly carClient: ClientProxy,
    @Inject('BUSES_SERVICE') private readonly busClient: ClientProxy,
    @Inject('TRAINS_SERVICE') private readonly trainClient: ClientProxy,
    @Inject('FLIGHT_SERVICE') private readonly flightClient: ClientProxy,
    @Inject('PARTNERS_SERVICE') private readonly partnerClient: ClientProxy,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto) {
    try {
      const tickets = await this.client
        .send('create_ticket', createTicketDto)
        .pipe(timeout(10000))
        .toPromise();
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async activeCar(scheduleDetailId: string) {
    try {
      await this.carClient
        .send('activate_schedule_booked', scheduleDetailId)
        .pipe(timeout(15000))
        .toPromise();
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async createExchangeTickets(
    oldTicketId: string,
    lostPercentage: string,
    newTicketId: string,
  ) {
    try {
      const exchangeTicket = await this.client
        .send('exchange_ticket_without_refund', {
          oldTicketId: oldTicketId,
          lostPercentage: lostPercentage,
          newTicketId: newTicketId,
        })
        .toPromise();
      return exchangeTicket;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async flightReport(report: {}) {
    let flightDateReport = report['departureAt'].split('T')[0];
    let flightSchedule = '';
    if (report['stations'].length > 2) {
      await Promise.all(
        report['stations'].map(async (station, index) => {
          if (index === 0 || index % 2 === 0)
            flightSchedule +=
              `Station ${index === 0 ? index + 1 : index}: ` +
              station['departureAt'] +
              ' ➡ ' +
              station['arrivalAt'] +
              '  ';
        }),
      );
    } else {
      flightSchedule = report['departureAt'] + ' ➡ ' + report['arrivalAt'];
    }
    return { flightDateReport, flightSchedule };
  }
  async checkPolicy(getPolicyByConditionsDTO: GetPolicyByConditionsDTO) {
    try {
      const policy = await this.partnerClient
        .send('get_policy_by_conditions', getPolicyByConditionsDTO)
        .pipe(timeout(20000))
        .toPromise();
      if (!policy || Object.entries(policy).length === 0) {
        throw new HttpException(
          'Không có chính sách hoàn trả cho vé này',
          HttpStatus.BAD_REQUEST,
        );
      }
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async bookVehicle(
    scheduleDetailId: string,
    numberOfTickets: number,
    vehicleType: string,
  ) {
    try {
      switch (vehicleType) {
        case 'buses':
          const busResult = await this.busClient
            .send('book_bus', {
              scheduleDetailId,
              numberOfTickets,
            })
            .toPromise();
          return busResult;
        case 'trains':
          const trainResult = await this.trainClient
            .send('book_train', { scheduleDetailId, numberOfTickets })
            .toPromise();
          return trainResult;
        default:
          break;
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  getClientByVehicle(vehicle: string) {
    switch (vehicle) {
      case 'trains':
        return this.trainClient;
      case 'buses':
        return this.busClient;
      case 'cars':
        return this.carClient;
      case 'flights':
        return this.flightClient;
      default:
        break;
    }
  }

  async getTicketFullInformation(tickets) {
    try {
      const ticketsFullInformation = await Promise.all(
        tickets.map(async (ticket) => {
          const schedule = await this.getClientByVehicle(ticket.vehicleType)
            .send('get_full_ticket_information', ticket.scheduleDetailId)
            .pipe(timeout(15000))
            .toPromise();
          let fullTicketInformation = { ...schedule };
          if (ticket.vehicleType === 'flights') {
            const vehicleClass = await this.partnerClient
              .send('get_class_by_partner_and_name', {
                partnerId: ticket.partnerId,
                className: schedule.details.seatType,
              })
              .pipe(timeout(15000))
              .toPromise();
            ticket.classId = vehicleClass.id;
          }
          return { ticket, ...fullTicketInformation };
        }),
      );
      return ticketsFullInformation;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async revokeTicket(
    scheduleDetailId: string,
    numberOfTickets: number,
    vehicleType: string,
  ) {
    try {
      switch (vehicleType) {
        case 'buses': {
          const busResult = await this.busClient
            .send('revoke_tickets', { scheduleDetailId, numberOfTickets })
            .pipe(timeout(15000))
            .toPromise();
          return busResult;
        }
        case 'trains': {
          const trainResult = await this.trainClient
            .send('cancel_book', { scheduleDetailId, numberOfTickets })
            .pipe(timeout(15000))
            .toPromise();
          return trainResult;
        }
        case 'cars': {
          const carResult = await this.carClient
            .send('cancel_schedule_booked', scheduleDetailId)
            .pipe(timeout(15000))
            .toPromise();
          return carResult;
        }
        case 'flights': {
          const flightResult = await this.flightClient
            .send('revoke_ticket', scheduleDetailId)
            .pipe(timeout(15000))
            .toPromise();
          return flightResult;
        }
        default:
          break;
      }
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Public()
  @Get('tickets/guest')
  async getTicketsByEmail(
    @Query('email') email: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    try {
      const tickets = await this.client
        .send('get_tickets_by_email', { email, limit, offset })
        .pipe(timeout(15000))
        .toPromise();
      const ticketsFullInformation = await this.getTicketFullInformation(
        tickets.tickets,
      );
      return { ticketsFullInformation, total: tickets.total };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Public()
  @Post('checkouts')
  async postTicket(@Body() createTicketDto: CreateTicketDto) {
    try {
      const tickets = await this.createTicket(createTicketDto);
      if (tickets.tickets[0].vehicleType === 'cars') {
        await this.activeCar(tickets.tickets[0].scheduleDetailId);
      }
      return tickets;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Public()
  @Patch('refund/guest')
  async refundTicket(
    @Body()
    data: {
      oldTicketId: string;
      getPolicy: GetPolicyByConditionsDTO;
    },
  ) {
    try {
      const { oldTicketId, getPolicy } = data;
      const policy = await this.checkPolicy(getPolicy);

      const refundStatus = await this.client
        .send('refund_ticket', {
          oldTicketId,
          lostPercentage: policy.lostPercentage,
        })
        .pipe(timeout(20000))
        .toPromise();
      return { refundStatus, status: HttpStatus.OK };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Roles(Role.partner)
  @Patch('refund/partner')
  async refundCancelSchedule(
    @Query('scheduleDetailId') scheduleDetailId: string,
  ) {
    try {
      const oldTicketContacts = await this.client
        .send('get_ticket_by_scheduleDetailId', scheduleDetailId)
        .pipe(timeout(15000))
        .toPromise();
      let vehicleType = '';
      const contacts = await Promise.all(
        oldTicketContacts.map(async (oldTicketContact) => {
          const oldTicketId = oldTicketContact.id;
          const refundStatus = await this.client
            .send('refund_ticket', { oldTicketId, lostPercentage: 0 })
            .toPromise();
          vehicleType = oldTicketContact.vehicleType;
          return {
            name: oldTicketContact.contactName,
            email: oldTicketContact.email,
            phoneNumber: oldTicketContact.phoneNumber,
            ...refundStatus,
          };
        }),
      );
      const result = await this.revokeTicket(
        scheduleDetailId,
        contacts.length,
        vehicleType,
      );
      return { contacts, result };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Roles(Role.partner)
  @Patch('refund/flightPartner')
  async refundCancelFlightSchedule(@Query('scheduleId') scheduleId: string) {
    try {
      const seats = await this.flightClient
        .send('get_booked_tickets_by_schedule', scheduleId)
        .pipe(timeout(15000))
        .toPromise();
      const cancelledTickets = seats.map(async (seat) => {
        const ticket = await this.client
          .send('get_ticket_by_scheduleDetailId', seat.id)
          .pipe(timeout(15000))
          .toPromise();
        await this.client
          .send('refund_ticket', { oldTicketId: ticket.id, lostPercentage: 0 })
          .pipe(timeout(15000))
          .toPromise();
        await this.revokeTicket(seat.id, 1, 'flights');
        return { ticketId: seat.id };
      });
      await Promise.all(cancelledTickets);
      return { cancelledTickets };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Public()
  @Get('report')
  async getNumberOfTickets(
    @Query('partnerId') partnerId: string,
    @Query('year') year: string,
  ) {
    try {
      const numberOfTickets = await this.client
        .send('get_number_of_tickets_by_partner', { partnerId, year })
        .pipe(timeout(15000))
        .toPromise();
      if (!numberOfTickets)
        throw new HttpException('Không có báo cáo', HttpStatus.BAD_REQUEST);
      return { numberOfTickets };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Public()
  @Post('checkPolicy')
  async isExchangeable(
    @Body()
    getPolicyByConditionsDTO: GetPolicyByConditionsDTO,
  ) {
    try {
      const policy = await this.checkPolicy(getPolicyByConditionsDTO);
      return policy;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Roles(Role.guest)
  @Post('exchange/finalPrice')
  async getPrice(
    @Body()
    data: {
      newTicketPrice: number;
      getPolicy: GetPolicyByConditionsDTO;
      oldTicketPrice: number;
    },
  ) {
    try {
      const { newTicketPrice, getPolicy, oldTicketPrice } = data;
      const policy = await this.checkPolicy(getPolicy);
      const refundAmount =
        oldTicketPrice - (oldTicketPrice * policy.lostPercentage) / 100;
      const finalPrice = newTicketPrice - refundAmount;
      return { newTicketPrice, refundAmount, finalPrice };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Roles(Role.guest)
  @Post('exchange/noRefund')
  async createExchangeTicketNoRefund(
    @Body()
    data: {
      oldTicketId: string;
      getPolicy: GetPolicyByConditionsDTO;
      newTicketId: string;
    },
  ) {
    try {
      const { oldTicketId, getPolicy, newTicketId } = data;
      const policy = await this.checkPolicy(getPolicy);
      const exchangeTicket = await this.createExchangeTickets(
        oldTicketId,
        policy.lostPercentage,
        newTicketId,
      );
      const revoke = await this.revokeTicket(
        exchangeTicket.oldTicket.scheduleDetailId,
        1,
        exchangeTicket.oldTicket.vehicleType,
      );
      return {
        message: 'Đổi vé thành công',
        exchangeTicket,
        revoke,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Roles(Role.guest)
  @Post('exchange/refund')
  async createExchangeTicketRefund(
    @Body()
    data: {
      oldTicketId: string;
      scheduleId?: string;
      schedulesDTO?: SchedulesDTO;
      createTicketDto: CreateTicketDto;
      getPolicy: GetPolicyByConditionsDTO;
      bookingDetails?: GetTicketsForBookingDTO;
    },
  ) {
    try {
      const { oldTicketId, getPolicy, createTicketDto } = data;
      const policy = await this.checkPolicy(getPolicy);
      const refundStatus = await this.client
        .send('exchange_ticket_with_refund', {
          oldTicketId,
          lostPercentage: policy.lostPercentage,
          totalPrice: createTicketDto.totalPrice,
        })
        .toPromise();
      createTicketDto.captureId = refundStatus.oldTicket.captureId;
      const ticket = await this.createTicket(createTicketDto);
      const exchangeTicket = await this.createExchangeTickets(
        refundStatus.oldTicket.id,
        policy.lostPercentage,
        ticket.tickets[0].id,
      );
      const revoke = await this.revokeTicket(
        exchangeTicket.oldTicket.scheduleDetailId,
        1,
        exchangeTicket.oldTicket.vehicleType,
      );

      let book = {};
      if (createTicketDto.vehicleType === vehicleType.FLIGHTS) {
        book = await this.flightClient
          .send('get_tickets_for_booking', {
            bookingDetails: {
              ...data.bookingDetails,
            },
            scheduleId: data.scheduleId,
          })
          .pipe(timeout(15000))
          .toPromise();
      } else if (createTicketDto.vehicleType === vehicleType.CARS) {
        book = await this.carClient
          .send('add_schedule', data.schedulesDTO)
          .toPromise();
        await this.activeCar(data.createTicketDto.scheduleDetailId[0]);
      } else {
        book = await this.bookVehicle(
          ticket.tickets[0].scheduleDetailId,
          1,
          ticket.tickets[0].vehicleType,
        );
      }

      return { refundStatus, ticket: ticket.tickets, revoke, book };
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
  @Public()
  @Get('admin/report')
  async getTicketsReport(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    try {
      const [tickets, error] = await this.client
        .send('get_tickets_by_month', { month, year })
        .toPromise();
      if (error) {
        throw new HttpException(
          error.message,
          error?.status || HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      const ticketsFullInformation = await this.getTicketFullInformation(
        tickets,
      );
      const reports = await Promise.all(
        ticketsFullInformation.map(async (report, index) => {
          const { id, vehicleType, fullName, ticketPrice } = report['ticket'];
          const profit = ticketPrice * 0.2;
          let dateReport = '';
          let schedule = '';
          let description = '';
          if (vehicleType === 'flights') {
            const {
              flightDateReport,
              flightSchedule,
            } = await this.flightReport(report);
            dateReport = flightDateReport;
            schedule = flightSchedule;
          } else if (typeof report['schedule'] === 'object') {
            const { date, departureAt, arrivalAt } = report['schedule'];
            dateReport = date;
            schedule = `${departureAt} ➡ ${arrivalAt}`;
          } else {
            dateReport = report['date'];
            schedule = `${report['startTime']} ➡ ${report['endTime']}`;
          }
          report['stations'].map(async (place, index) => {
            const placeDes = place['description'];
            if (index === report['stations'].length - 1) {
              return (description += placeDes);
            }
            return (description += placeDes + ' ➡ ');
          });
          return {
            index: index + 1,
            ticketId: id,
            vehicleType,
            date: dateReport,
            customerName: fullName,
            journey: description,
            schedule: schedule,
            ticketPrice: ticketPrice,
            profit: profit,
          };
        }),
      );
      return reports;
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
