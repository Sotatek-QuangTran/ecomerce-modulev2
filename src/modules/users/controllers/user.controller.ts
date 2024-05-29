import { Body, Get, Post, Put, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ControllerCustom } from 'src/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { UserUpdateDto } from '../dtos/user-req.dto';
import { ResponseOkDto } from 'src/common';
import { RedisService } from 'src/shared/services/redis.service';

@ControllerCustom('/users', 'Users', true)
export class UserController {
  constructor(
    private userService: UserService,
    private redisService: RedisService,
  ) {}

  @Get('/detail')
  @ApiOkResponse({ type: UserDto })
  async getUser(@Request() req: { user: { id: number } }) {
    return await this.userService.findOne({ id: req.user.id });
  }

  @Put('/update')
  @ApiOkResponse({ type: UserDto })
  async updateUser(
    @Request() req: { user: { id: number } },
    @Body() body: UserUpdateDto,
  ) {
    return await this.userService.update(req.user.id, body);
  }

  @Post('/signout')
  @ApiOkResponse({ type: ResponseOkDto })
  async signOut(@Request() req: { user: { id: number } }) {
    await this.redisService.del(req.user.id + '');
    return req;
  }
}
