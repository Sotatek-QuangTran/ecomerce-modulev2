import { Body, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto, UserSignIn } from '../dtos/user-req.dto';
import { ControllerCustom } from 'src/decorators';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { JwtService } from '@nestjs/jwt';

@ControllerCustom('/auth', 'Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({ type: UserDto })
  async createUser(@Body() body: UserCreateDto) {
    console.log(body);
    return await this.userService.create(body);
  }

  @Post('/signin')
  @ApiOkResponse({ type: UserDto })
  async signIn(@Body() body: UserSignIn) {
    const user = await this.userService.findOneByUsernamePassword(body);
    const token = await this.jwtService.signAsync({
      _id: user.id,
    });
    return { token, user };
  }

  @Get('')
  async getList() {
    return await this.userService.findAndCount({}, {});
  }
}
