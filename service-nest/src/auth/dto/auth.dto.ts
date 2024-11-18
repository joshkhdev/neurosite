import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FastifyRequest } from 'fastify';
import { UserRole } from 'src/users/entities/user.entity';

export interface IAuthUserEmail {
  readonly email: string;
}

export interface IAuthUserPassword {
  readonly password: string;
}

export interface ICreateUser extends IAuthUserEmail, IAuthUserPassword {
  readonly name: string;
}

export class AuthUserDto implements IAuthUserEmail, IAuthUserPassword {
  @IsEmail()
  public readonly email: string;

  @IsStrongPassword()
  public readonly password: string;
}

export class CreateUserDto extends AuthUserDto implements ICreateUser {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly name: string;
}

export interface AuthSession {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  name: string;
  role: UserRole;
}

export interface JwtFastifyRequest extends FastifyRequest {
  user: JwtPayload;
}
