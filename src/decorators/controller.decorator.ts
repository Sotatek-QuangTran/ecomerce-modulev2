import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';

export function ControllerCustom(
  prefix: string,
  api_tag: string,
): ClassDecorator {
  return applyDecorators(ApiTags(api_tag), Controller(prefix));
}
