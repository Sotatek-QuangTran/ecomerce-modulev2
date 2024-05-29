import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-req.dto';
import { BcryptService } from 'src/shared/services/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private bcryptService: BcryptService,
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

  async findOne(criteria: UserUpdateDto) {
    const user = await this.userEntity.findOne({
      where: criteria,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async checkUnique(data: { email: string }) {
    const where: FindOptionsWhere<UserEntity>[] = [];
    Object.keys(data).map((d) => {
      where.push({ [d]: data[d] });
    });
    const user = await this.userEntity.findOne({
      where,
    });
    return user;
  }

  async update(id: number, data: UserUpdateDto) {
    await this.userEntity.update({ id }, data);
    return await this.findOne({ id });
  }

  async findAndCount(criteria, pagination) {
    const [data, total] = await this.userEntity.findAndCount({
      where: criteria,
      ...pagination,
    });
    return { data, total };
  }

  async findOneByUsernamePassword(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await this.userEntity.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Login fail');
    }
    await this.bcryptService.compareBcrypt(password, user.password);
    return user;
  }
}
