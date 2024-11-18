import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { from, map, Observable, of, switchMap, zip } from 'rxjs';
import {
  AuthSession,
  AuthUserDto,
  CreateUserDto,
  ICreateUser,
  JwtPayload,
} from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public signUp(createUserDto: CreateUserDto): Observable<AuthSession> {
    return this.hashPassword(createUserDto.password).pipe(
      switchMap((passwordHash: string) => {
        const userData: ICreateUser = {
          ...createUserDto,
          password: passwordHash,
        };
        return this.usersService
          .create(userData)
          .pipe(switchMap(() => this.signIn(createUserDto)));
      }),
    );
  }

  public signIn(authUserDto: AuthUserDto): Observable<AuthSession> {
    return this.usersService.findByEmailOrNull(authUserDto.email).pipe(
      map((user) => {
        if (!user) {
          throw new ConflictException('User with this email is not registered');
        }

        return user;
      }),
      switchMap((user) =>
        this.verifyPassword(user.password, authUserDto.password).pipe(
          map((isMatch) => {
            if (!isMatch) {
              throw new ConflictException('Password is incorrect');
            }

            if (user.isBlocked) {
              throw new ConflictException('User is blocked');
            }

            return user;
          }),
        ),
      ),
      switchMap((user) =>
        this.signTokens({
          sub: user.id,
          name: user.name,
          role: user.role,
        }).pipe(
          switchMap((tokens) => {
            return this.updateRefreshToken(user.id, tokens.refreshToken).pipe(
              switchMap(() => of(tokens)),
            );
          }),
        ),
      ),
    );
  }

  private signTokens(payload: JwtPayload): Observable<AuthSession> {
    return zip([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get('JWT_ACCESS_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRATION'),
      }),
    ]).pipe(
      map(([accessToken, refreshToken]) => ({
        accessToken,
        refreshToken,
      })),
    );
  }

  public logout(userId: string): Observable<void> {
    return this.usersService.update(userId, { refreshToken: undefined });
  }

  private updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Observable<void> {
    return this.usersService.update(userId, { refreshToken });
  }

  private hashPassword(password: string): Observable<string> {
    return from(argon2.hash(password));
  }

  private verifyPassword(
    passwordHash: string,
    password: string,
  ): Observable<boolean> {
    return from(argon2.verify(passwordHash, password));
  }
}
