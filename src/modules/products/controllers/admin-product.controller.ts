import { ControllerCustom } from 'src/decorators';
import { ProductService } from '../services/product.service';
import { Get, Query } from '@nestjs/common';
import { ProductQueryReq } from '../dtos/product-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';

@ControllerCustom('/admin/product', 'Admin Product')
export class AdminProductController {
  constructor(
    private productService: ProductService,
    private pageService: PaginateService,
  ) {}

  @Get('/list')
  async listProduct(@Query() query: ProductQueryReq) {
    return this.productService.findQueryBuilder(
      query,
      this.pageService.paginate(query),
    );
  }
}
