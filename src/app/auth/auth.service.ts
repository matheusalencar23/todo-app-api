import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const match = await user.validatePassword(password);
      if (!match) throw new UnauthorizedException();
    }

    return this.generateAccessToken(user);
  }

  async generateAccessToken(user: UsersEntity) {
    const payload = { email: user.email, name: user.name, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
