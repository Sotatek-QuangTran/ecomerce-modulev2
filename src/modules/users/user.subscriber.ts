import {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  DataSource,
} from 'typeorm';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(dataSource: DataSource, private bcryptService: BcryptService) {
    dataSource.subscribers.push(this);
  }

  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    if (event.entity.password) {
      event.entity.password = await this.bcryptService.hashBcrypt(
        event.entity.password,
      );
    }
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    if (event.entity.password) {
      event.entity.password = await this.bcryptService.hashBcrypt(
        event.entity.password,
      );
    }
  }
}
