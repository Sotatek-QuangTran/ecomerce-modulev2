import { ControllerCustom } from 'src/decorators';
import { CartService } from '../services/cart.service';
import { Body, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CartCreateDto, CartUpdateDto } from '../dtos/card-req.dto';

@ControllerCustom('/cart', 'Cart', true)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('/add')
  async addToCart(
    @Body() body: CartCreateDto,
    @Request() req: { user: { id: number } },
  ) {
    body.userId = req.user.id;
    return await this.cartService.create(body);
  }

  @Get('')
  async getCart(@Request() req: { user: { id: number } }) {
    return await this.cartService.findCartByUser(req.user.id);
  }

  @Put('/update/:id')
  async updateCart(@Param('id') id: number, @Body() body: CartUpdateDto) {
    return await this.cartService.update(id, body);
  }

  @Delete('/delete/:id')
  async deleteCart(@Param('id') id: number) {
    return await this.cartService.remove(id);
  }
}
