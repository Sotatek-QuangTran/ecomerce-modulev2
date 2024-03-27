import { Body, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto, UserSignIn } from '../dtos/user-req.dto';
import { ControllerCustom } from 'src/decorators';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/shared/services/redis.service';
import { v4 } from 'uuid';

@ControllerCustom('/auth', 'Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({ type: UserDto })
  async createUser(@Body() body: UserCreateDto) {
    return { data: await this.userService.create(body) };
  }

  @Post('/signin')
  @ApiOkResponse({ type: UserDto })
  async signIn(@Body() body: UserSignIn) {
    const user = await this.userService.findOneByUsernamePassword(body);
    const key = v4();
    const token = await this.jwtService.signAsync({
      id: user.id,
      key,
    });
    await this.redisService.del(user.id + '');
    this.redisService.redis.set(user.id + '', key, 'NX');
    // this.redisService.redis.set(user.id + '', token, 'EX', 60, 'NX');
    return {
      data: { token, user },
    };
  }

  @Get('/multi')
  async getUser10() {
    return { data: await this.userService.ageMulti10() };
  }
}
