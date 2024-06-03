import { ControllerCustom } from 'src/decorators';
import { FavoriteService } from '../services/favorite.sevice';
import { Body, Get, Post, Query, Request } from '@nestjs/common';
import { FavoriteCreateDto, FavoriteReqDto } from '../dtos/favorite.dto';
import { PaginateService } from 'src/shared/services/paginate.service';
import { CriteriaService } from 'src/shared/services/criteria.service';

@ControllerCustom('/favorite', 'Favorite', true)
export class FavoriteController {
  constructor(
    private favoriteService: FavoriteService,
    private pageService: PaginateService,
    private criteriaService: CriteriaService,
  ) {}

  @Post('/create')
  async addFavorite(@Body() body: FavoriteCreateDto) {
    return await this.favoriteService.create(body);
  }

  @Get('/list')
  async listFavoriteByUser(
    @Query() query: FavoriteReqDto,
    @Request() req: { user: { id: number } },
  ) {
    query.userId = req.user.id;
    return await this.favoriteService.findAndCount(
      this.criteriaService.handleParam(query),
      this.pageService.paginate(query),
    );
  }
}
