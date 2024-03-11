import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from '../entities/color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity) private colorEntity: Repository<ColorEntity>,
  ) {}

  async create(data) {
    return await this.colorEntity.save(this.colorEntity.create(data));
  }
}
