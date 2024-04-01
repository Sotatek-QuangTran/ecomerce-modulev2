import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';

interface PrefixOrOptions {
  prefix: string;
  api_tag: string;
  auth?: boolean;
}

// Overloaded functions
function ControllerCustom(
  prefixOrOptions: string,
  api_tag: string,
  auth?: boolean,
): ClassDecorator;
function ControllerCustom(options: PrefixOrOptions): ClassDecorator;

function ControllerCustom(
  prefixOrOptions: string | PrefixOrOptions,
  api_tag?: string,
  auth?: boolean,
): ClassDecorator {
  let prefix: string, tag: string;
  let decors = [];
  if (typeof prefixOrOptions === 'string') {
    prefix = prefixOrOptions;
    tag = api_tag;
    if (auth) decors.push(Auth());
  } else {
    prefix = prefixOrOptions.prefix;
    tag = prefixOrOptions.api_tag;
    if (prefixOrOptions.auth) decors.push(Auth());
  }
  decors = [ApiTags(tag), Controller(prefix)];
  if (auth) decors.push(Auth());
  return applyDecorators(...decors);
}

export { ControllerCustom };
