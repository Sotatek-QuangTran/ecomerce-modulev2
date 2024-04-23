import { Injectable } from '@nestjs/common';

@Injectable()
export class CriteriaService {
  handleParam(query: any) {
    const result = {};
    for (const item in query) {
      if (!['page', 'pageSize', 'sortBy', 'sortField'].includes(item)) {
        result[item] = query[item];
      }
    }
    return result;
  }
}
