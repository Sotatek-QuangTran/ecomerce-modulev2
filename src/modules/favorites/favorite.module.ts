import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteService } from './services/favorite.sevice';
import { FavoriteController } from './controllers/favorite.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity]),
    ClientsModule.register([
      {
        name: 'FAVORITE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'favour',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'favour-consumer',
          },
        },
      },
    ]),
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
