import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RegisterPartnerDTO } from 'src/dtos/register-partner.dto';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  private readonly logger = new Logger('PartnersController');

  constructor(private partnersService: PartnersService) {}

  @MessagePattern('get_partner_by_presenter')
  async getPartnerByPresenter(
    @Payload() presenterId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.getPartnerByPresenter(
        presenterId,
      );
      return { partner };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_partner_by_id')
  async getPartnerById(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.getPartnerById(partnerId);
      const { logoUrl, name } = partner;
      return { logoUrl, name };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_partner_by_name')
  async getPartnerByName(@Payload() name: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.getPartnerByName(name);
      return partner;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_partner_by_email')
  async getPartnerByEmail(
    @Payload() email: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.getPartnerByEmail(email);
      return partner;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_partner_by_hotline')
  async getPartnerByHotline(
    @Payload() hotline: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.getPartnerByHotline(hotline);
      return partner;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_all_inactive_partners')
  async getAllInactivePartners(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partners = await this.partnersService.getAllInactivePartners();
      return partners;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('register_partner')
  async postPartner(
    @Payload() registerPartnerDTO: RegisterPartnerDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const partner = await this.partnersService.registerPartner(
        registerPartnerDTO,
      );
      return HttpStatus.CREATED;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('activate_partner')
  async activatePartner(
    @Payload() partnerId: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const isSuccess = await this.partnersService.activatePartner(partnerId);
      return isSuccess;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('change_partner_logo')
  async changeLogo(
    @Payload() payload: { partnerId: string; logoUrl: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    const { logoUrl, partnerId } = payload;
    try {
      const partner = await this.partnersService.changePartnerLogo(
        partnerId,
        logoUrl,
      );
      return {
        changes: {
          updatedAt: partner.updatedAt,
          logoUrl: partner.logoUrl,
        },
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
