import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { QueryCommonDto } from 'src/common';

class OrderCreateDto {
  @ApiProperty()
  productVariantId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  purchaseId: number;
}

export class PurchaseCreateDto {
  userId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ type: [OrderCreateDto] })
  @IsArray()
  orders: OrderCreateDto[];
}

export class PurchaseQueryDto extends QueryCommonDto {}
