import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
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
  categoryId: number;
}

export class ProductQueryReq extends QueryCommonDto {
  @ApiProperty({ required: false })
  @IsOptional()
  categoryId?: number;
}

export class ProductUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  categoryId: number;
}

export class ProductVariantCreateDto {
  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsInt()
  sizeId: number;

  @ApiProperty()
  @IsInt()
  colorId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stock: number;
}
