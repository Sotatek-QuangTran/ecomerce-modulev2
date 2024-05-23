import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteService } from './services/favorite.sevice';
import { FavoriteController } from './controllers/favorite.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
