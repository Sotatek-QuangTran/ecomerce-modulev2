import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { QueryCommonDto } from 'src/common';

export class FavoriteCreateDto {
  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  userId: number;
}

export class FavoriteReqDto extends QueryCommonDto {
  userId?: number;
}
