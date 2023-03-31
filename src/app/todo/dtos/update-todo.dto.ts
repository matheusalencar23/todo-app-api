import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @ApiPropertyOptional()
  task: string;

  @IsOptional()
  @ApiPropertyOptional()
  isDone: boolean;
}
