import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './jwt-config/jwt-config.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtConfigService],
  exports: [AuthService],
})
export class AuthModule {}
