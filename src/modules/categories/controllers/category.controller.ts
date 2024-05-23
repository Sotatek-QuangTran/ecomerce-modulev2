import { ControllerCustom } from 'src/decorators';
import { CategoryService } from '../services/category.service';
import { Get } from '@nestjs/common';

@ControllerCustom('/category', 'Category', false)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  async listCategory() {
    return await this.categoryService.find();
  }
}
