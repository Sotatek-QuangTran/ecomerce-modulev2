import { ControllerCustom } from 'src/decorators';
import { ProductService } from '../services/product.service';
import { Get, Param, Query } from '@nestjs/common';
import { ProductQueryReq } from '../dtos/product-req.dto';
import { PaginateService } from 'src/shared/services/paginate.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { ProductResponseDto } from '../dtos/product-res.dto';
import { CriteriaService } from 'src/shared/services/criteria.service';

@ControllerCustom('/products', 'Products', false)
export class ProductController {
  constructor(
    private productService: ProductService,
    private pageService: PaginateService,
    private criteriaService: CriteriaService,
  ) {}

  @Get('/list')
  async getList(@Query() query: ProductQueryReq) {
    const { list, total } = await this.productService.findAndCount(
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

  @Get('/detail/:id')
  @ApiOkResponse({ type: ProductResponseDto })
  async getDetail(@Param('id') id: number) {
    return await this.productService.findById(id);
  }
}
