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
import { ApiTags } from '@nestjs/swagger';
import { UserId } from '../decorators/user.decorator';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index(@UserId() userId: string) {
    return await this.todoService.findAll(userId);
  }

  @Post()
  async create(@Body() body: CreateTodoDto, @UserId() userId: string) {
    return await this.todoService.create(body, userId);
  }

  @Get(':id')
  async show(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    return await this.todoService.findById(id, userId);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
    @UserId() userId: string,
  ) {
    return await this.todoService.updateById(id, body, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserId() userId: string,
  ) {
    await this.todoService.deleteById(id, userId);
  }
}
