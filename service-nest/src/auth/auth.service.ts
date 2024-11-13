import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { AuthUserDto } from './dto/auth.dto';

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

  public signUp(user: AuthUserDto): Observable<any> {
    return from(
      this.client.auth.signUp({
        email: user.email,
        password: user.password,
      }),
    );
  }

  public signIn(user: AuthUserDto): Observable<any> {
    return from(
      this.client.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      }),
    );
  }

  /**
   * TODO
   */
  public sendResetPasswordLink(email: string): Observable<any> {
    return from(
      this.client.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:8080/account/reset-password',
      }),
    );
  }

  /**
   * TODO
   */
  public updatePassword(password: string): Observable<any> {
    return from(this.client.auth.updateUser({ password }));
  }
}
