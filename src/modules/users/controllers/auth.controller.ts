import { Body, Post } from '@nestjs/common';
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
    return await this.userService.create(body);
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
    // await this.redisService.redis.set(user.id + '', key, 'NX');
    await this.redisService.redis.set(user.id + '', key, 'EX', 3600, 'NX');
    return { token, user };
  }
}
