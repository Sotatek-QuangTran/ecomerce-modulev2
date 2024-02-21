import { ApiTags } from '@nestjs/swagger';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { Serialize } from 'src/interceptors';

export function ControllerCustom(
  prefix: string,
  api_tag: string,
): ClassDecorator {
  return applyDecorators(
    ApiTags(api_tag),
    Controller(prefix),
    UsePipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    ),
    Serialize(),
  );
}
