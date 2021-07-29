import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDTO } from 'src/services/users/dtos/create-user.dto';
import { timeout } from 'rxjs/operators';
import { UpdateUserDTO } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');

  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<string> {
    try {
      const user = await this.getUserByEmail(createUserDTO.email);
      if (user)
        throw new HttpException('Email exists!', HttpStatus.BAD_REQUEST);
      const userId = await this.client
        .send('register_user', createUserDTO)
        .pipe(timeout(15000))
        .toPromise();
      return userId;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.client
        .send('get_user_by_email', email)
        .pipe(timeout(15000))
        .toPromise();
      if (!user)
        throw new HttpException(
          'Email does not exist!',
          HttpStatus.BAD_REQUEST,
        );
      const isPasswordMatching = await compare(password, user.key);
      if (!isPasswordMatching)
        throw new HttpException(
          'Password is not correct!',
          HttpStatus.BAD_REQUEST,
        );
      if (!user.isActive)
        throw new HttpException(
          'Your email has not been activated!',
          HttpStatus.BAD_REQUEST,
        );
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async getUserByID(userId: string) {
    try {
      const user = await this.client
        .send('get_user_by_id', userId)
        .pipe(timeout(15000))
        .toPromise();
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.client
        .send('get_user_by_email', email)
        .pipe(timeout(15000))
        .toPromise();
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async activateUser(userId: string) {
    try {
      const user = await this.getUserByID(userId);
      if (!user)
        throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST);
      await this.client
        .send('activate_user', userId)
        .pipe(timeout(15000))
        .toPromise();
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const user = await this.client
        .send('get_user_by_email', email)
        .pipe(timeout(15000))
        .toPromise();
      return !!user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  async checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
    try {
      const user = await this.client
        .send('get_user_by_phone_number', phoneNumber)
        .pipe(timeout(15000))
        .toPromise();
      return !!user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      const passwordDoesMatch = await this.client
        .send('check_password', { userId, currentPassword })
        .pipe(timeout(15000))
        .toPromise();
      if (!passwordDoesMatch) throw new Error('Password is wrong!');
      const result = await this.client
        .send('change_password', { userId, newPassword })
        .pipe(timeout(15000))
        .toPromise();
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async generateResetPasswordCode(email: string) {
    try {
      const resetPasswordCode = await this.client
        .send('generate_reset_password_code', email)
        .pipe(timeout(15000))
        .toPromise();
      return resetPasswordCode;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async resetPassword(email: string, password: string) {
    try {
      await this.client
        .send('reset_password', { email, password })
        .pipe(timeout(15000))
        .toPromise();
      return { message: 'Reset password successfully' };
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async updateUserProfile(userId: string, updateUserDTO: UpdateUserDTO) {
    try {
      const result = await this.client
        .send('update_user_profile', { ...updateUserDTO, userId })
        .pipe(timeout(15000))
        .toPromise();
      return result;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(error.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.client
        .send('get_all_users', true)
        .pipe(timeout(15000))
        .toPromise();
      return [users, null];
    } catch (error) {
      this.logger.error(error.message);
      return [null, error];
    }
  }

  async getNumberOfUsers(year: number) {
    try {
      const report = await this.client
        .send('get_number_of_user', year)
        .pipe(timeout(15000))
        .toPromise();
      return [report, null];
    } catch (error) {
      this.logger.error(error.message);
      return [null, error];
    }
  }
}
