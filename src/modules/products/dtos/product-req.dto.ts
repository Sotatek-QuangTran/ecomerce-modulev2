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
  sizeId: number;

  @ApiProperty()
  @IsInt()
  colorId: number;

  @ApiProperty()
  @IsInt()
  categoryId: number;
}

export class ProductQueryReq extends QueryCommonDto {}
