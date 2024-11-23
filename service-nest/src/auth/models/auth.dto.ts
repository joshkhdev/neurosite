import { IsEmail, IsStrongPassword } from 'class-validator';

export interface IAuthUserEmail {
  readonly email: string;
}

export class AuthUserEmailDto implements IAuthUserEmail {
  @IsEmail()
  public readonly email: string;
}

export interface IAuthUserPassword {
  readonly password: string;
}

export class AuthUserPasswordDto implements IAuthUserPassword {
  @IsStrongPassword()
  public readonly password: string;
}

export class AuthUserDto implements IAuthUserEmail, IAuthUserPassword {
  @IsEmail()
  public readonly email: string;

  @IsStrongPassword()
  public readonly password: string;
}

export class AuthSessionDto {
  public readonly accessToken: string;
  public readonly refreshToken: string;
}
