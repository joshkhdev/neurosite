import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  createClient,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthUserDto } from './dto/auth.dto';
import { UserWithSessionResponseDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  private readonly client: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    this.client = createClient(
      this.config.getOrThrow('SUPABASE_URL'),
      this.config.getOrThrow('SUPABASE_ANON_KEY'),
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      },
    );
  }

  public signUp(user: AuthUserDto): Observable<UserResponseDto> {
    return from(
      this.client.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          emailRedirectTo: 'http://localhost:8080/account/',
        },
      }),
    ).pipe(
      switchMap(({ data: { user }, error }: AuthResponse) => {
        if (error !== null) {
          throw new ConflictException(error);
        }

        if (!user) {
          throw new ConflictException('User was not found');
        }

        return of(new UserResponseDto(user));
      }),
    );
  }

  public signIn(user: AuthUserDto): Observable<UserWithSessionResponseDto> {
    return from(
      this.client.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      }),
    ).pipe(
      switchMap(
        ({ data: { user, session }, error }: AuthTokenResponsePassword) => {
          if (error) {
            throw new ConflictException(error);
          }

          if (!user || !session) {
            throw new ConflictException('User or session was not found');
          }

          return of(new UserWithSessionResponseDto(user, session));
        },
      ),
    );
  }

  /**
   * TODO
   */
  public signOut(): Observable<void> {
    return from(this.client.auth.signOut()).pipe(
      switchMap(({ error }: AuthTokenResponsePassword) => {
        if (error) {
          throw new ConflictException(error);
        }

        return of(void 0);
      }),
    );
  }

  /**
   * TODO
   */
  public getUser(jwt: string): Observable<any> {
    return from(this.client.auth.getUser(jwt));
  }

  /**
   * TODO
   */
  public sendResetPasswordLink(email: string): Observable<any> {
    return from(
      this.client.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:8080/account/reset-password',
      }),
    ).pipe(
      switchMap(({ error }) => {
        if (error) {
          throw new ConflictException(error);
        }

        return of(void 0);
      }),
    );
  }

  /**
   * TODO
   */
  public updatePassword(password: string): Observable<UserResponseDto> {
    return from(this.client.auth.updateUser({ password })).pipe(
      switchMap(({ data: { user }, error }: UserResponse) => {
        if (error) {
          throw new ConflictException(error);
        }

        if (!user) {
          throw new ConflictException('User was not found');
        }

        return of(new UserResponseDto(user));
      }),
    );
  }
}
