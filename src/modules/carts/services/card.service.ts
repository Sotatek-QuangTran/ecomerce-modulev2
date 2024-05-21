import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { CartCreateDto } from '../dtos/card-req.dto';
import { ProductVariantService } from 'src/modules/products/services/product-variant.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartEntity: Repository<CartEntity>,
    private productVariantService: ProductVariantService,
  ) {}

  async create(data: CartCreateDto) {
    await this.productVariantService.findById(data.productVariantId);
    return await this.cartEntity.save(this.cartEntity.create(data));
  }

  async findCartByUser(userId: number) {
    return await this.cartEntity.find({
      where: { userId },
      order: { id: 'DESC' },
    });
  }
}
