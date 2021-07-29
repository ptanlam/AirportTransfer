import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../../services/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
