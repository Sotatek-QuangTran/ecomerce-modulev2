import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';

export function ControllerCustom(
  prefix: string,
  api_tag: string,
  auth?: boolean,
): ClassDecorator {
  const decors = [ApiTags(api_tag), Controller(prefix)];
  if (auth) decors.push(Auth());
  return applyDecorators(...decors);
}
