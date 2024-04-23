import { ControllerCustom } from 'src/decorators';
import { Body, Post } from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseCreateDto } from '../dtos/purchase-req.dto';

@ControllerCustom('/purchases', 'Purchases')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/create')
  async createPurchase(@Body() body: PurchaseCreateDto) {
    return { data: await this.purchaseService.create(body) };
  }
}
