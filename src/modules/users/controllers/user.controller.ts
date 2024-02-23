import { Body, Put, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ControllerCustom } from 'src/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { UserUpdateDto } from '../dtos/user-req.dto';

@ControllerCustom('/users', 'Users')
@Auth()
export class UserController {
  constructor(private userService: UserService) {}

  @Put('/update')
  @ApiOkResponse({ type: UserDto })
  async updateUser(
    @Request() req: { user: { id: number } },
    @Body() body: UserUpdateDto,
  ) {
    return { data: await this.userService.update(req.user.id, body) };
  }
}
