import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/helpers/swagger/error-swagger';
import { UserId } from '../decorators/user.decorator';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { CreateTodoResponse } from './swagger/create-todo.swagger';
import { TodoResponse } from './swagger/index-todo.swagger';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks by user' })
  @ApiResponse({
    status: 200,
    description: 'User task list',
    type: TodoResponse,
    isArray: true,
  })
  async index(@UserId() userId: string) {
    return await this.todoService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task for the user' })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: CreateTodoResponse,
  })
  async create(@Body() body: CreateTodoDto, @UserId() userId: string) {
    return await this.todoService.create(body, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id task and user' })
  @ApiResponse({
    status: 200,
    description: 'Task corresponding to id',
    type: TodoResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponse,
  })
  async show(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    return await this.todoService.findById(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the task by id task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: TodoResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponse,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
    @UserId() userId: string,
  ) {
    return await this.todoService.updateById(id, body, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete the task by id task' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: ErrorResponse,
  })
  async destroy(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    await this.todoService.deleteById(id, userId);
  }
}
