import { Session, User } from '@supabase/auth-js';
import { Nullable } from 'src/shared/helpers/type.helper';

export class UserResponseDto {
  public readonly id: string;
  public readonly email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email ?? '';
  }
}

export class UserWithSessionResponseDto extends UserResponseDto {
  public readonly session?: UserSession;

  constructor(user: User, session: Nullable<Session>) {
    super(user);
    this.session = session
      ? {
          token_type: session.token_type,
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_in: session.expires_in,
          expires_at: session.expires_at,
        }
      : undefined;
  }
}

export interface UserSession {
  readonly token_type: string;
  readonly access_token: string;
  readonly refresh_token: string;
  readonly expires_in: number;
  readonly expires_at?: number;
}
