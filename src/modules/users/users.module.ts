import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UserSubscriber } from './user.subscriber';
import { RedisService } from 'src/shared/services/redis.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [UserService, UserSubscriber, RedisService],
  controllers: [UserController, AuthController],
  exports: [UserService],
})
export class UserModule {}
