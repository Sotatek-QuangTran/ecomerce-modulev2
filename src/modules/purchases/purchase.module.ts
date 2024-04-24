import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services/order.service';
import { PurchaseService } from './services/purchase.service';
import { PurchaseController } from './controllers/purchase.controller';
import { PurchaseEntity } from './entities/purchase.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, PurchaseEntity]),
    SharedModule,
  ],
  providers: [OrderService, PurchaseService],
  controllers: [PurchaseController],
})
export class PurchaseModule {}
