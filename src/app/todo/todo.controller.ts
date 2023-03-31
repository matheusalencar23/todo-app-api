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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserId } from '../decorators/user.decorator';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index(@UserId() userId: string) {
    return await this.todoService.findAll(userId);
  }

  @Post()
  async create(@Req() req: Request, @UserId() userId: string) {
    const body: CreateTodoDto = req.body;
    return await this.todoService.create(body, userId);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.updateById(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }
}
