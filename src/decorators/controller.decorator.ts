import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';

interface PrefixOrOptions {
  prefix: string;
  api_tag: string;
  auth?: boolean;
}

export function ControllerCustom(
  prefixOrOptions: string | PrefixOrOptions,
  api_tag: string,
  auth?: boolean,
): ClassDecorator {
  let prefix: string, tag: string;
  if (typeof prefixOrOptions === 'string') {
    prefix = prefixOrOptions;
    tag = api_tag;
  } else {
    prefix = prefixOrOptions.prefix;
    tag = prefixOrOptions.api_tag;
  }
  const decors = [ApiTags(tag), Controller(prefix)];
  if (auth) decors.push(Auth());
  return applyDecorators(...decors);
}
