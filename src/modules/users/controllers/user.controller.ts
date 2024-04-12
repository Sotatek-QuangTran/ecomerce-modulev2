import { Body, Get, Post, Put, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ControllerCustom } from 'src/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { UserUpdateDto } from '../dtos/user-req.dto';
import { ResponseOkDto } from 'src/common';

@ControllerCustom('/users', 'Users', true)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/detail')
  @ApiOkResponse({ type: UserDto })
  async getUser(@Request() req: { user: { id: number } }) {
    return { data: await this.userService.findById(req.user.id) };
  }

  @Put('/update')
  @ApiOkResponse({ type: UserDto })
  async updateUser(
    @Request() req: { user: { id: number } },
    @Body() body: UserUpdateDto,
  ) {
    return { data: await this.userService.update(req.user.id, body) };
  }

  @Post('/signout')
  @ApiOkResponse({ type: ResponseOkDto })
  async signOut(@Request() req: { user: { id: number } }) {
    return req;
  }
}
