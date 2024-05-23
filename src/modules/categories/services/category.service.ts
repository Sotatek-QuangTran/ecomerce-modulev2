import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntity: Repository<CategoryEntity>,
  ) {}

  async create(data) {
    return await this.categoryEntity.save(this.categoryEntity.create(data));
  }

  async find() {
    return await this.categoryEntity.find({
      order: { order: 'DESC' },
    });
  }
}
