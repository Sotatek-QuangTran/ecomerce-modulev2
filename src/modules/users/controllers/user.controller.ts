import { Body, Post, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ControllerCustom } from 'src/decorators';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { Auth } from 'src/decorators/auth.decorator';

@ControllerCustom('/users', 'Users')
@Auth()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/update/:id')
  @ApiOkResponse({ type: UserDto })
  async signIn(@Request() req: { user: { id: number } }, @Body() body) {
    return await this.userService.update(req.user.id, body);
  }
}
