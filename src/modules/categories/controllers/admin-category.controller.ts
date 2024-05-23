import { ControllerCustom } from 'src/decorators';
import { CategoryService } from '../services/category.service';
import { Body, Post } from '@nestjs/common';
import { CategoryCreateDto } from '../dtos/category.dto';

@ControllerCustom('/admin/category', 'Admin Controller', false)
export class CategoryAdminController {
  constructor(private categoryService: CategoryService) {}

  @Post('')
  async create(@Body() body: CategoryCreateDto) {
    return await this.categoryService.create(body);
  }
}
