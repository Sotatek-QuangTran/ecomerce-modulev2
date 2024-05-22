import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CartUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity: number;
}

export class CartCreateDto {
  @ApiProperty()
  @IsInt()
  productVariantId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity: number;

  userId: number;
}
