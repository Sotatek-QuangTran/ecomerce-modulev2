import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private dto?: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        errorCode: 0,
        message: data?.message || 'success',
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
      })),
    );
  }
}

interface ClassConstructor {
  new (...args: any[]): unknown;
}

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

export function Serialize(dto?: ClassConstructor) {
  return UseInterceptors(new ResponseInterceptor(dto));
}
