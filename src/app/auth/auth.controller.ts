import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SingInResponse } from './swagger/sign-in.swagger';

@Controller('api/v1/auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticates the user by email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication',
    type: SingInResponse,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
