import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../user/user.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private readonly userService: UsersService,
  ) {}

  async findAll(userId: string) {
    return await this.todoRepository.find({
      where: { user: { id: userId, isActive: true } },
    });
  }

  async findById(id: string, userId: string) {
    try {
      return await this.todoRepository.findOneOrFail({
        where: { id: id, user: { id: userId, isActive: true } },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(data: CreateTodoDto, userId: string) {
    const newTodo = this.todoRepository.create({
      ...data,
      user: await this.userService.findById(userId),
    });
    return await this.todoRepository.save(newTodo);
  }

  async updateById(id: string, data: UpdateTodoDto, userId: string) {
    const todo = await this.findById(id, userId);
    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id: string, userId: string) {
    await this.findById(id, userId);
    await this.todoRepository.softDelete(id);
  }
}
