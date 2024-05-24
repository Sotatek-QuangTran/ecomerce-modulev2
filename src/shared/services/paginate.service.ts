import { Injectable } from '@nestjs/common';
import { QueryCommonDto } from 'src/common';
import { IPaginate } from 'src/common/inteface.common';
import { ProductQueryReq } from 'src/modules/products/dtos/product-req.dto';

@Injectable()
export class PaginateService {
  paginate(data: QueryCommonDto): IPaginate {
    const page = data.page || 1;
    const pageSize = data.pageSize || 10;
    const sortBy = data.sortBy || 'desc';
    const sortField = data.sortField || 'id';
    return {
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { [sortField]: sortBy },
    };
  }

  response(data: {
    page: number;
    pageSize: number;
    total: number;
    items: any;
  }) {
    const page = +data.page || 1;
    const pageSize = +data.pageSize || 10;
    return {
      items: data.items,
      pagination: {
        total: data.total,
        page,
        pageSize,
        pageCount: Math.ceil(data.total / pageSize),
      },
    };
  }

  filterPaginateParam(query: any): ProductQueryReq {
    const result = {};
    for (const item in query) {
      if (!['page', 'pageSize', 'sortBy', 'sortField'].includes(item)) {
        result[item] = query[item];
      }
    }
    return result;
  }
}
