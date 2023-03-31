import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  isDone: boolean;

  @IsNotEmpty()
  userId: string;
}
