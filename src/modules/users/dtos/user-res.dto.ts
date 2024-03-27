import { ApiProperty } from '@nestjs/swagger';
import { ResponseWithPagingDto } from 'src/common';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}

export class UserListResponseDto extends ResponseWithPagingDto {
  @ApiProperty({ type: UserDto, isArray: true })
  data: UserDto[];
}
