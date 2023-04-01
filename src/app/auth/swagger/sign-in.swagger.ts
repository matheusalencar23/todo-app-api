import { ApiProperty } from '@nestjs/swagger';

export class SingInResponse {
  @ApiProperty()
  access_token: string;
}
