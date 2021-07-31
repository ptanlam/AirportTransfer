import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CancellationTicketDto } from 'src/dtos/create-cancel-ticket.dtos';
import { ExchangeTicketDto } from 'src/dtos/create-exchange-ticket.dtos';
import { PaymentService } from 'src/payment/payment.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { TicketPoliciesService } from './ticket-policies.service';

@Controller('ticket-policies')
export class TicketPoliciesController {
  private readonly logger = new Logger('TicketPolicyController');

  constructor(
    private readonly ticketPoliciesService: TicketPoliciesService,
    private readonly paymentService: PaymentService,
    private readonly ticketService: TicketsService,
  ) {}

  @MessagePattern('refund_ticket')
  async createCancellationTicket(
    @Payload() cancellationTicketDto: CancellationTicketDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const cancellationTicket = await this.ticketPoliciesService.createCancellationTicket(
        cancellationTicketDto,
      );
      const response = await this.paymentService.refundOrder(
        cancellationTicket.captureId,
        false,
        cancellationTicket.refundAmount,
      );
      return {
        cancellationTicket,
        response,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('exchange_ticket_without_refund')
  async createExchangeTicket(
    @Payload() exchangeTicketDto: ExchangeTicketDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const oldTicket = await this.ticketService.getTicketById(
        exchangeTicketDto.oldTicketId,
      );
      const exchangeTicket = await this.ticketPoliciesService.createExchangeTicket(
        exchangeTicketDto,
      );
      return { oldTicket, exchangeTicket };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('exchange_ticket_with_refund')
  async createExchangeTicketRefund(
    @Payload()
    data: {
      oldTicketId: string;
      lostPercentage: number;
      totalPrice: number;
    },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const oldTicket = await this.ticketService.getTicketById(
        data.oldTicketId,
      );
      const refundAmount = parseFloat(
        (
          Math.abs(
            data.totalPrice -
              (oldTicket.ticketPrice -
                (oldTicket.ticketPrice * data.lostPercentage) / 100),
          ) / 23000
        ).toFixed(2),
      );
      if (refundAmount > oldTicket.ticketPrice)
        throw new HttpException(
          'Tiền hoàn lại không thể lớn hơn tiền vé bị đổi',
          HttpStatus.CONFLICT,
        );
      const refundStatus = await this.paymentService.refundOrder(
        oldTicket.captureId,
        false,
        refundAmount,
      );
      return { oldTicket, refundStatus };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      channel.ack(originalMessage);
    }
  }
}
