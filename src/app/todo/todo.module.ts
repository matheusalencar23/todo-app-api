import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity]), UsersModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
