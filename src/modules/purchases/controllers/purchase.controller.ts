import { ControllerCustom } from 'src/decorators';
import { Body, Get, Post, Query } from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { PurchaseCreateDto, PurchaseQueryDto } from '../dtos/purchase-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';
import { CriteriaService } from 'src/shared/services/criteria.service';

@ControllerCustom('/purchases', 'Purchases')
export class PurchaseController {
  constructor(
    private purchaseService: PurchaseService,
    private pageService: PaginateService,
    private criteriaService: CriteriaService,
  ) {}

  @Post('/create')
  async createPurchase(@Body() body: PurchaseCreateDto) {
    return { data: await this.purchaseService.create(body) };
  }

  @Get('/list')
  async listPurchase(@Query() query: PurchaseQueryDto) {
    const { list, total } = await this.purchaseService.findAndCount(
      this.criteriaService.handleParam(query),
      this.pageService.paginate(query),
    );
    return this.pageService.response({
      items: list,
      total,
      page: query?.page,
      pageSize: query?.pageSize,
    });
  }
}
