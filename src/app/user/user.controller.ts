import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from './swagger/index-user.swagger';
import { UsersService } from './user.service';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponse,
  })
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }
}
