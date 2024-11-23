import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { from, map, Observable, switchMap, zip } from 'rxjs';
import { AuthSessionDto, AuthUserDto } from './models/auth.dto';
import { JwtPayload } from './models/auth.interfaces';
import { CreateUserDto } from '../users/models/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public signUp(createUserDto: CreateUserDto): Observable<AuthSessionDto> {
    return this.hashValue(createUserDto.password).pipe(
      switchMap((passwordHash: string) => {
        const userData: CreateUserDto = {
          ...createUserDto,
          password: passwordHash,
        };
        return this.usersService.handleUserConflicts(userData).pipe(
          switchMap(() => this.usersService.create(userData)),
          switchMap(() => this.signIn(createUserDto)),
        );
      }),
    );
  }

  public signIn(authUserDto: AuthUserDto): Observable<AuthSessionDto> {
    return this.usersService.findByEmailOrNull(authUserDto.email).pipe(
      map(user => {
        if (!user) {
          throw new ConflictException('User with this email is not registered');
        }

        return user;
      }),
      switchMap(user =>
        this.verifyHash(user.password, authUserDto.password).pipe(
          map(isMatch => {
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
      switchMap(user =>
        this.signTokens({
          sub: user.id,
          name: user.name,
          role: user.role,
        }).pipe(
          switchMap(tokens => {
            return this.updateRefreshToken(user.id, tokens.refreshToken).pipe(
              map(() => tokens),
            );
          }),
        ),
      ),
    );
  }

  public refreshTokens(
    userId: string,
    refreshToken: string,
  ): Observable<AuthSessionDto> {
    return this.usersService.findByUuid(userId).pipe(
      map(user => {
        if (!user.refreshToken) {
          throw new ForbiddenException('Access Denied');
        }

        return user;
      }),
      switchMap(user =>
        this.verifyHash(user.refreshToken!, refreshToken).pipe(
          map(isMatch => {
            if (!isMatch) {
              throw new ForbiddenException('Access Denied');
            }

            return user;
          }),
        ),
      ),
      switchMap(user =>
        this.signTokens({
          sub: user.id,
          name: user.name,
          role: user.role,
        }),
      ),
      switchMap(tokens =>
        this.updateRefreshToken(userId, tokens.refreshToken).pipe(
          map(() => tokens),
        ),
      ),
    );
  }

  public logout(userId: string): Observable<void> {
    return this.usersService.update(userId, { refreshToken: undefined });
  }

  private signTokens(payload: JwtPayload): Observable<AuthSessionDto> {
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

  private updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Observable<void> {
    return this.hashValue(refreshToken).pipe(
      switchMap((refreshTokenHash: string) =>
        this.usersService.update(userId, { refreshToken: refreshTokenHash }),
      ),
    );
  }

  private hashValue(value: string): Observable<string> {
    return from(argon2.hash(value));
  }

  private verifyHash(hash: string, value: string): Observable<boolean> {
    return from(argon2.verify(hash, value));
  }
}
