import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/app/user/swagger/index-user.swagger';
import { TodoResponse } from './index-todo.swagger';

export class CreateTodoResponse extends TodoResponse {
  @ApiProperty()
  user: UserResponse;
}
