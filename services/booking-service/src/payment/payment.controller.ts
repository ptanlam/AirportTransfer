import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { debug } from 'node:console';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger('PaymentController');
  constructor(private readonly paymentService: PaymentService) {}
  async createOrder(captureId: string, refundAmount: number) {
    try {
      const res = await this.paymentService.refundOrder(
        captureId,
        false,
        refundAmount,
      );
      return res.status;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }

  async sendFund(@Body() data: { email: string; value: number }) {
    try {
      const respone = await this.paymentService.sendFund(
        data.email,
        data.value,
      );
      const captureId = await this.paymentService.getCaptureId(
        respone.result.id,
      );
      return respone;
    } catch (error) {
      this.logger.error(error.message);
      throw HttpStatus.SERVICE_UNAVAILABLE;
    }
  }
}
