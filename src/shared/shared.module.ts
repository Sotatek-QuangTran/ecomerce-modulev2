import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { PaginateService } from './services/paginate.service';

@Module({
  providers: [BcryptService, PaginateService],
  exports: [BcryptService, PaginateService],
})
export class SharedModule {}
