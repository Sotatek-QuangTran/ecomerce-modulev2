import { Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  redis: Redis;

  onModuleInit() {
    this.redis = new Redis();
  }

  set(key: string, value: string | number) {
    this.redis.set(key, value);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async del(key: string) {
    return await this.redis.del(key);
  }
}
