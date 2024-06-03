import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginateService } from 'src/shared/services/paginate.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private pageService?: PaginateService, private dto?: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const switchToHttp = context.switchToHttp();
    return next.handle().pipe(
      map((data) => {
        let response = data;
        console.log(data);
        if (data?.total !== undefined) {
          response = this.pageService.response({
            items: data.list,
            page: switchToHttp.getRequest().page,
            pageSize: switchToHttp.getRequest().pageSize,
            total: data.total,
          });
        }
        return {
          errorCode: 0,
          message: data?.message || 'success',
          statusCode: switchToHttp.getResponse().statusCode,
          data: response,
        };
      }),
    );
  }
}

// interface ClassConstructor {
//   new (...args: any[]): unknown;
// }

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

// export function Serialize(dto?: ClassConstructor) {
//   return UseInterceptors(new ResponseInterceptor(dto));
// }
