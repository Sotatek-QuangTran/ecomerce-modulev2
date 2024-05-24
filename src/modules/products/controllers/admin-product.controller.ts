import { ControllerCustom } from 'src/decorators';
import { ProductService } from '../services/product.service';
import { Body, Get, Post, Query } from '@nestjs/common';
import { ProductCreateDto, ProductQueryReq } from '../dtos/product-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';

@ControllerCustom('/admin/product', 'Admin Product')
export class AdminProductController {
  constructor(
    private productService: ProductService,
    private pageService: PaginateService,
  ) {}

  @Get('/list')
  async listProduct(@Query() query: ProductQueryReq) {
    const { list, total } = await this.productService.findQueryBuilder(
      this.pageService.filterPaginateParam(query),
      this.pageService.paginate(query),
    );
    return this.pageService.response({
      items: list,
      total,
      page: query?.page,
      pageSize: query?.pageSize,
    });
  }

  @Get('/total-sales')
  async listWithTotalSale(@Query() query: ProductQueryReq) {
    const { list, total } = await this.productService.findAndSaleByProduct(
      this.pageService.filterPaginateParam(query),
      this.pageService.paginate(query),
    );
    return this.pageService.response({
      items: list,
      total,
      page: query?.page,
      pageSize: query?.pageSize,
    });
  }

  @Post('/create')
  async createProduct(@Body() body: ProductCreateDto) {
    return await this.productService.create(body);
  }
}
