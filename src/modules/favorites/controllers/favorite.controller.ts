import { ControllerCustom } from 'src/decorators';
import { FavoriteService } from '../services/favorite.sevice';
import {
  Body,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { FavoriteCreateDto, FavoriteReqDto } from '../dtos/favorite.dto';
import { PaginateService } from 'src/shared/services/paginate.service';
import { CriteriaService } from 'src/shared/services/criteria.service';
import { ClientKafka } from '@nestjs/microservices';

@ControllerCustom('/favorite', 'Favorite', false)
export class FavoriteController implements OnModuleInit {
  constructor(
    private favoriteService: FavoriteService,
    private pageService: PaginateService,
    private criteriaService: CriteriaService,
    @Inject('FAVORITE') private client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('productFavourite');
  }

  @Post('/create')
  async addFavorite(@Body() body: FavoriteCreateDto) {
    return await this.favoriteService.create(body);
  }

  @Get('/list')
  async listFavoriteByUser(
    @Query() query: FavoriteReqDto,
    @Request() req: { user: { id: number } },
  ) {
    query.userId = req?.user?.id;
    const { items, total } = await this.favoriteService.findAndCount(
      this.criteriaService.handleParam(query),
      this.pageService.paginate(query),
    );
    return { items, total };
  }

  @Post('/kafka/send')
  sendKafkaFavor() {
    this.client.send('productFavourite', 'test message').subscribe((data) => {
      console.log('object', data);
    });
    return;
  }
}
