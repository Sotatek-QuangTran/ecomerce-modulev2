import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { Auth } from './auth.decorator';

interface PrefixOrOptions {
  prefix: string;
  apiTag: string;
  auth?: boolean;
}

// Overloaded functions
function ControllerCustom(
  prefixOrOptions: string,
  apiTag: string,
  auth?: boolean,
): ClassDecorator;
function ControllerCustom(options: PrefixOrOptions): ClassDecorator;

function ControllerCustom(
  prefixOrOptions: string | PrefixOrOptions,
  apiTag?: string,
  auth?: boolean,
): ClassDecorator {
  let prefix: string, tag: string;
  let decors = [];
  if (typeof prefixOrOptions === 'string') {
    prefix = prefixOrOptions;
    tag = apiTag;
    if (auth) decors.push(Auth());
  } else {
    prefix = prefixOrOptions.prefix;
    tag = prefixOrOptions.apiTag;
    if (prefixOrOptions.auth) decors.push(Auth());
  }
  decors = [ApiTags(tag), Controller(prefix)];
  if (auth) decors.push(Auth());
  return applyDecorators(...decors);
}

export { ControllerCustom };
