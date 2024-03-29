import { ControllerCustom } from 'src/decorators';
import { ProductService } from '../services/product.service';
import { Get, Query } from '@nestjs/common';
import { ProductQueryReq } from '../dtos/product-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';

@ControllerCustom('/products', 'Products', true)
export class ProductController {
  constructor(
    private productService: ProductService,
    private pageService: PaginateService,
  ) {}

  @Get('/list')
  async getList(@Query() query: ProductQueryReq) {
    const { list, total } = await this.productService.findAndCount(
      query,
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
