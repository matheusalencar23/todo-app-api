import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @ApiProperty()
  task: string;

  @IsOptional()
  @ApiProperty()
  isDone: boolean;
}
