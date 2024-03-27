import { Injectable } from '@nestjs/common';
import { QueryCommonDto } from 'src/common';

@Injectable()
export class PaginateService {
  paginate(data: QueryCommonDto) {
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
      data: data.items,
      pagination: {
        total: data.total,
        page,
        pageSize,
        pageCount: Math.ceil(data.total / pageSize),
      },
    };
  }
}
