import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserCreateDto } from '../dtos/user-req.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  async create(data: UserCreateDto) {
    const checkEmailExist = await this.userEntity.findOne({
      where: { email: data.email },
    });
    if (checkEmailExist) {
      throw new BadRequestException('Email exist');
    }
    return await this.userEntity.save(this.userEntity.create(data));
  }

  async findById(id: number) {
    const user = await this.userEntity.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async checkUnique(data) {
    const where: FindOptionsWhere<UserEntity> = {};
    const user = await this.userEntity.findOne({
      where: [],
    });
  }

  async update(id, data) {
    await this.userEntity.update({ id }, data);
    return await this.findById(id);
  }
}
