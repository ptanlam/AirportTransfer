import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { compare } from 'bcrypt';
import { CreateUserDTO } from 'src/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger('UserController');

  constructor(private usersService: UsersService) {}

  @MessagePattern('get_user_by_email')
  async getUserByEmail(@Payload() email: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const user = await this.usersService.getUserByEmail(email);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_user_by_phone_number')
  async getUserByHotline(
    @Payload() phoneNumber: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const user = await this.usersService.getUserByPhoneNumber(phoneNumber);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('register_user')
  async register(
    @Payload() createUserDTO: CreateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const id = await this.usersService.createNewUser(createUserDTO);
      return id;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_user_by_id')
  async getUserById(@Payload() userId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const user = await this.usersService.getUserById(userId);
      return user;
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('activate_user')
  async activateUser(@Payload() userId: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.usersService.activateUser(userId);
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('check_password')
  async checkPassword(
    @Payload() data: { userId: string; currentPassword: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const user = await this.usersService.getUserById(data.userId);
      if (!user) throw new Error('User does not exist!');

      const passwordDoesMatch = await compare(data.currentPassword, user.key);
      return passwordDoesMatch;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('change_password')
  async changePassword(
    @Payload() data: { userId: string; newPassword: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const isSuccess = await this.usersService.changePassword(
        data.userId,
        data.newPassword,
      );
      if (!isSuccess) return HttpStatus.BAD_REQUEST;
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('generate_reset_password_code')
  async generateResetPasswordCode(
    @Payload() email: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const resetPasswordCode = await this.usersService.generateResetPasswordCode(
        email,
      );
      return resetPasswordCode;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('reset_password')
  async resetPassword(
    @Payload() data: { email: string; password: string },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.usersService.resetPassword(data.email, data.password);
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('update_user_profile')
  async updateUser(
    @Payload() updateUserDTO: UpdateUserDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.usersService.updateUserProfile(updateUserDTO);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_all_users')
  async getAllUsers(@Payload() isCalled: boolean, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const users = await this.usersService.getAllUsers();
      return users;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }

  @MessagePattern('get_number_of_user')
  async getNumberOfUsers(@Payload() year: number, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      const result = await this.usersService.getNumberOfUser(year);
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    } finally {
      channel.ack(originalMessage);
    }
  }
}
