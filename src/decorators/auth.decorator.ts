import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthenUserGuard } from 'src/guards/auth.guard';

export function Auth(): ClassDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthenUserGuard));
}
