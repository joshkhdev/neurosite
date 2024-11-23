import { IsEmail, IsStrongPassword } from 'class-validator';
import { FastifyRequest } from 'fastify';
import { UserRole } from '../../users/entities/user.entity';

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

export class AuthSession {
  public readonly accessToken: string;
  public readonly refreshToken: string;
}

export interface JwtPayload {
  readonly sub: string;
  readonly name: string;
  readonly role: UserRole;
}

export interface JwtPayloadExtended extends JwtPayload {
  readonly refreshToken: string;
}

export interface JwtFastifyRequest extends FastifyRequest {
  user: JwtPayloadExtended;
}
