import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { QueryCommonDto } from 'src/common';

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

export class UserUpdateDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  name?: string;

  id?: number;
}

export class UserQueryDto extends QueryCommonDto {}

export class UserEmailDto {
  @ApiProperty()
  @IsString()
  email: string;
}

export class UserSignIn extends UserEmailDto {
  @ApiProperty()
  @IsString()
  password: string;
}

export class UserVerifyForgotPassDto {
  @ApiProperty()
  @IsString()
  code: string;
}
