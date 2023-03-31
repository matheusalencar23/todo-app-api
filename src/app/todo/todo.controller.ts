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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserId } from '../decorators/user.decorator';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks by user' })
  async index(@UserId() userId: string) {
    return await this.todoService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task for the user' })
  async create(@Body() body: CreateTodoDto, @UserId() userId: string) {
    return await this.todoService.create(body, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id task and user' })
  async show(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    return await this.todoService.findById(id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the task by id task' })
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
  async destroy(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    await this.todoService.deleteById(id, userId);
  }
}
