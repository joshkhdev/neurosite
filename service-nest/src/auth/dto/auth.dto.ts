import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class AuthUserEmailDto {
  @IsEmail()
  email: string;
}

export class AuthUserPasswordDto {
  @IsStrongPassword()
  password: string;
}
