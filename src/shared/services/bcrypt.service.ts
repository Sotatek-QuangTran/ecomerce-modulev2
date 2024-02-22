import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashBcrypt(text: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await genSalt(saltOrRounds);
    return await hash(text, salt);
  }

  async compareBcrypt(text: string, compareText: string): Promise<boolean> {
    const checkText = await compare(text, compareText);
    if (!checkText) {
      throw new BadRequestException('Wrong Password');
    }
    return checkText;
  }
}
