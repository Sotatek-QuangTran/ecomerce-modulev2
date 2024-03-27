import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { QueryCommonDto } from 'src/common';

export class ProductCreateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  size_id: number;

  @ApiProperty()
  @IsInt()
  color_id: number;

  @ApiProperty()
  @IsInt()
  category_id: number;
}

export class ProductQueryReq extends QueryCommonDto {}
