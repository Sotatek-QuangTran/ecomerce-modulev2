import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ROLE } from 'src/common';
import { AuthenUserGuard } from 'src/guards/auth.guard';

export function Auth(roles: ROLE[] = []): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    ApiBearerAuth(),
    UseGuards(AuthenUserGuard),
  );
}
