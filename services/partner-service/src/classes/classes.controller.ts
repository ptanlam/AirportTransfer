import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AddClassDTO } from 'src/dtos/add-class.dto';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  private readonly logger = new Logger('ClassesController');

  constructor(private classesService: ClassesService) {}

  @MessagePattern('get_class_by_id')
  async getClassById(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const vehicleClass = await this.classesService.getClassById(id);
      return vehicleClass;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_class_by_partner_and_name')
  async getClassByPartnerAndName(
    @Payload() data: { partnerId: string; className: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const vehicleClass = await this.classesService.getClassByPartnerAndName(
        data.partnerId,
        data.className,
      );
      return vehicleClass;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('add_classes')
  async addClasses(
    @Payload() addClassDTO: AddClassDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.classesService.addClass(
        addClassDTO.name,
        addClassDTO.partnerId,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('edit_class')
  async editClass(
    @Payload() data: { name: string; classId: string; partnerId: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.classesService.editClass(
        data.name,
        data.classId,
        data.partnerId,
      );
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('remove_class')
  async removeClass(@Payload() classId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const vehicleClass = await this.classesService.removeClass(classId);
      return { classId: vehicleClass.id };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
