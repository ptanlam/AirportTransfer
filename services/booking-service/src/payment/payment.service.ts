import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize';
const paypal = require('@paypal/checkout-server-sdk');

@Injectable()
export class PaymentService {
  private readonly logger = new Logger('PaymentService');
  environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
  client() {
    return new paypal.core.PayPalHttpClient(this.environment());
  }

  async prettyPrint(jsonData, pre = '') {
    let pretty = '';
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        if (typeof key !== 'number') pretty += pre + capitalize(key) + ': ';
        else pretty += pre + (parseInt(key) + 1) + ': ';
        if (typeof jsonData[key] === 'object') {
          pretty += '\n';
          pretty += await this.prettyPrint(jsonData[key], pre + '    ');
        } else {
          pretty += jsonData[key] + '\n';
        }
      }
    }
    return pretty;
  }

  async createOrder(value: number) {
    let order;
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: value,
            },
          },
        ],
      });
      order = await this.client().execute(request);
      console.log(await this.prettyPrint(order));
      console.log(await this.prettyPrint(order.result));
      return order;
    } catch (err) {
      console.error(err);
    }
  }

  async refundOrder(captureId, debug = false, refundAmount: number) {
    try {
      const request = new paypal.payments.CapturesRefundRequest(captureId);
      request.requestBody({
        amount: {
          value: refundAmount,
          currency_code: 'USD',
        },
      });
      const response = await this.client().execute(request);
      if (debug) {
        console.log('Status Code: ' + response.statusCode);
        console.log('Status: ' + response.result.status);
        console.log('Refund ID: ' + response.result.id);
        console.log('Links:');
        response.result.links.forEach((item, index) => {
          let rel = item.rel;
          let href = item.href;
          let method = item.method;
          let message = `\t${rel}: ${href}\tCall Type: ${method}`;
          console.log(message);
        });
        console.log(JSON.stringify(response.result, null, 4));
      }
      return response;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async getCaptureId(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    try {
      const capture = await this.client().execute(request);
      const captureID =
        capture.result.purchase_units[0].payments.captures[0].id;
      return captureID;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async sendFund(email: string, value: number) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: value,
          },
          payee: {
            email_address: email,
          },
        },
      ],
    });

    let order;
    try {
      order = await this.client().execute(request);
      return order;
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
