import { ApiProperty } from '@nestjs/swagger';

export class TodoResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  task: string;

  @ApiProperty()
  isDone: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  deletedAt: string;
}
