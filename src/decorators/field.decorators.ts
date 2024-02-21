import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';

interface IIntApiPropertyOptions extends ApiPropertyOptions {
  min?: number;
  max?: number;
  int?: boolean;
}

export function NumberField(
  options: IIntApiPropertyOptions,
): PropertyDecorator {
  const swagger: ApiPropertyOptions = {};
  const decorators = [Type(() => Number)];

  if (options.int) {
    decorators.push(IsInt());
  } else {
    decorators.push(IsNumber({ allowInfinity: false, allowNaN: false }));
  }

  if (typeof options.min === 'number') {
    decorators.push(Min(options.min));
    swagger.minimum = options.min;
  }

  if (typeof options.max === 'number') {
    decorators.push(Max(options.max));
    swagger.maximum = options.max;
  }

  if (options.required === false) {
    decorators.push(IsOptional());
    swagger.required = false;
  }

  decorators.push(ApiProperty(swagger));
  return applyDecorators(...decorators);
}

export function DateField(options?: IIntApiPropertyOptions): PropertyDecorator {
  const swagger: ApiPropertyOptions = {};
  const decorators = [Type(() => Date), IsDate()];

  if (options.required === false) {
    decorators.push(IsOptional());
    swagger.required = false;
  }

  decorators.push(ApiProperty(swagger));
  return applyDecorators(...decorators);
}
