import { Body, Post, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  UserCreateDto,
  UserEmailDto,
  UserSignIn,
  UserVerifyForgotPassDto,
} from '../dtos/user-req.dto';
import { ControllerCustom } from 'src/decorators';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from '../dtos/user-res.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/shared/services/redis.service';
import { v4 } from 'uuid';
import { MailService } from 'src/modules/mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@ControllerCustom('/auth', 'Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({ type: UserDto })
  async createUser(@Body() body: UserCreateDto) {
    await this.userService.create(body);
    await this.mailService.sendMailRegister({
      email: body.email,
      url: this.configService.get('DOMAIN') + '/verify-register',
    });
    return { success: true };
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

  @Post('/signin-cookie')
  @ApiOkResponse({ type: UserDto })
  async signInWithCookie(
    @Body() body: UserSignIn,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.findOneByUsernamePassword(body);
    const token = await this.jwtService.signAsync({
      id: user.id,
    });
    res.cookie('token', token, {
      expires: new Date(Date.now() + 10000),
      httpOnly: true,
    });
    return { token, user };
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: UserEmailDto) {
    const user = await this.userService.findOne({ email: body.email });
    return user;
  }

  @Post('/verify-forgot-password')
  async verifyForgotPassword(@Body() body: UserVerifyForgotPassDto) {
    return body;
  }
}
