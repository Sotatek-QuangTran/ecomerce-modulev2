import { Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { PaginateService } from './services/paginate.service';
import { RedisService } from './services/redis.service';

@Module({
  providers: [BcryptService, PaginateService, RedisService],
  exports: [BcryptService, PaginateService, RedisService],
})
export class SharedModule {}
