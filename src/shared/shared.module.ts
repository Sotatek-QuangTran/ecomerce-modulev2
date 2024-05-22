import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt.service';
import { PaginateService } from './services/paginate.service';
import { RedisService } from './services/redis.service';
import { CriteriaService } from './services/criteria.service';

@Global()
@Module({
  providers: [BcryptService, PaginateService, RedisService, CriteriaService],
  exports: [BcryptService, PaginateService, RedisService, CriteriaService],
})
export class SharedModule {}
