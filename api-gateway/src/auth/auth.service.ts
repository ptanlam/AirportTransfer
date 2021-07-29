import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(private jwtService: JwtService) {}

  async getCookieWithJwtToken(userId: string, role: string) {
    try {
      const token = await this.jwtService.signAsync({ id: userId, role });
      return token;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async generateTokenForVerify(userId: string) {
    try {
      const token = await this.jwtService.signAsync({ id: userId });
      return token;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error(error.message);
    }
  }

  async verifyToken(token: string, response: Response): Promise<any> {
    try {
      await this.jwtService.verifyAsync(token);
      const userId: string = this.jwtService.decode(token)['id'];
      return userId;
    } catch (error) {
      this.logger.error(error.message);
      throw new Error('Please login again to continue!');
    }
  }
}
