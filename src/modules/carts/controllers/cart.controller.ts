import { ControllerCustom } from 'src/decorators';
import { CartService } from '../services/card.service';
import { Body, Get, Post, Request } from '@nestjs/common';
import { CartCreateDto } from '../dtos/card-req.dto';

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
}
