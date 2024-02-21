import { ApiProperty } from '@nestjs/swagger';
import { NumberField } from 'src/decorators';
import { SORTBY } from './enum.common';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryCommonDto {
  @NumberField({ int: true, required: false })
  page?: number;

  @NumberField({ int: true, required: false })
  pageSize?: number;

  @ApiProperty({ required: false, enum: SORTBY })
  @IsOptional()
  @IsEnum(SORTBY)
  sortBy?: SORTBY;

  @ApiProperty({ required: false })
  @IsOptional()
  sortField?: string;
}

export class ResponseCommonDto {
  @ApiProperty()
  error_code: number;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class ResponsePaginateDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPage: number;
}

export class ResponseWithPagingDto extends ResponseCommonDto {
  @ApiProperty({ type: ResponsePaginateDto })
  pagination: ResponseCommonDto;
}

export class ResponseOkDto extends ResponseCommonDto {
  @ApiProperty()
  ok: boolean;
}

export class ResponseErrorDto extends ResponseCommonDto {
  @ApiProperty()
  error: string;
}
