import { ControllerCustom } from 'src/decorators';
import { Body, Get, Post, Query, Request } from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseCreateDto, PurchaseQueryDto } from '../dtos/purchase-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';

@ControllerCustom('/purchases', 'Purchases', true)
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService,
    private pageService: PaginateService,
  ) {}

  @Post('/create')
  async createPurchase(
    @Body() body: PurchaseCreateDto,
    @Request() req: { user: { id: number } },
  ) {
    body.userId = req.user.id;
    return await this.purchaseService.create(body);
  }

  @Get('/list')
  async listPurchase(@Query() query: PurchaseQueryDto) {
    return await this.purchaseService.findAndCount(
      this.pageService.filterPaginateParam(query),
      this.pageService.paginate(query),
    );
  }
}
