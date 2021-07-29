import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor() {
    this.nodemailerTransport = createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendRegistrationMail(
    email: string,
    firstName: string,
    lastName: string,
    host: string,
    token: string,
  ) {
    try {
      await this.nodemailerTransport.sendMail({
        to: email,
        subject: 'Verify your account',
        html:
          `<h2>Hello ${firstName} ${lastName}</h2>` +
          '<p>Please verify your account by clicking this:</p>' +
          `<a style='text-decoration: none' ` +
          `href='http://${host}/api/auth/confirmation/${token}'>` +
          `<h1 style='display: inline-block, color: #0194f3'>Verification link</h1>` +
          `</a>` +
          `<br />` +
          '<h4>Thank You!</h4>',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sendTickets(email: string, subject: string, tickets: []) {
    try {
      await this.nodemailerTransport.sendMail({
        to: email,
        subject,
        html: '',
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sendResetPasswordCode(email: string, resetPasswordCode: string) {
    try {
      await this.nodemailerTransport.sendMail({
        to: email,
        subject: 'Reset your password',
        html:
          `<p>Here is your reset password code:</p>` +
          `<h1 style='display: inline-block'>${resetPasswordCode}</h1>` +
          `<p>Please do not share this code to anyone!</p>`,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
