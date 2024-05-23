import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from '../entities/favorite.entity';
import { Repository } from 'typeorm';
import { FavoriteCreateDto, FavoriteReqDto } from '../dtos/favorite.dto';
import { IPaginate } from 'src/common/inteface.common';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteEntity: Repository<FavoriteEntity>,
  ) {}

  async create(data: FavoriteCreateDto) {
    const favorite = await this.favoriteEntity.findOne({
      where: {
        productId: data.productId,
        userId: data.userId,
      },
    });
    if (favorite) {
      return await this.favoriteEntity.delete({ id: favorite.id });
    }
    return await this.favoriteEntity.save(this.favoriteEntity.create(data));
  }

  async findAndCount(data: FavoriteReqDto, paginate: IPaginate) {
    const [items, total] = await this.favoriteEntity.findAndCount({
      where: data,
      ...paginate,
    });
    return { items, total };
  }
}
