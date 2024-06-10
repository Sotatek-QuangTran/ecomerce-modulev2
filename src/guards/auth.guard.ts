import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';
import { RedisService } from 'src/shared/services/redis.service';

@Injectable()
export class AuthenUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException('UnAuthorized');
    }
    //login here//
    const payload = await this.jwtService.verifyAsync(token);
    const getRedis = await this.redisService.get(payload.id);
    if (!getRedis || getRedis !== payload.key) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne({ id: payload.id });
    request['user'] = user;
    return true;
  }
}
