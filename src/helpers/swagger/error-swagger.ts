import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error: string;
}
