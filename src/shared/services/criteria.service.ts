import { Injectable } from '@nestjs/common';
import { ProductQueryReq } from 'src/modules/products/dtos/product-req.dto';

@Injectable()
export class CriteriaService {
  handleParam(query: any): ProductQueryReq {
    const result = {};
    for (const item in query) {
      if (!['page', 'pageSize', 'sortBy', 'sortField'].includes(item)) {
        result[item] = query[item];
      }
    }
    return result;
  }
}
