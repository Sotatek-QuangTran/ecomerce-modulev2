import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/cart.entity';
import { In, Repository } from 'typeorm';
import { CartCreateDto, CartUpdateDto } from '../dtos/card-req.dto';
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

  async findById(id: number) {
    const cart = await this.cartEntity.findOne({
      where: { id },
    });
    if (!cart) {
      throw new NotFoundException('Cart Not Found');
    }
  }

  async update(id: number, data: CartUpdateDto) {
    await this.cartEntity.update({ id }, data);
    return await this.findById(id);
  }

  async remove(id: number) {
    return await this.cartEntity.delete({ id });
  }

  async softRemove(ids: number[]) {
    return await this.cartEntity.softDelete({ id: In(ids) });
  }
}
