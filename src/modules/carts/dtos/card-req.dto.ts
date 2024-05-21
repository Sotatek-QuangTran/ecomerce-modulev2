import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CartCreateDto {
  @ApiProperty()
  @IsInt()
  productVariantId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  userId: number;
}
