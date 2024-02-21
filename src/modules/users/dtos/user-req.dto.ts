import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

const MAX_LENGTH = 50;

export class UserCreateDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(MAX_LENGTH)
  name: string;

  @ApiProperty()
  @IsStrongPassword({ minLength: 6 })
  password: string;
}

export class UserUpdateDto {}
