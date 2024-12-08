import { AuthSessionDto } from '@api/models';

export abstract class StorageHelper {
  private static readonly ACCESS_KEY = 'ns_access_token';
  private static readonly REFRESH_KEY = 'ns_refresh_token';

  public static writeSession(session: AuthSessionDto): void {
    this.write(this.ACCESS_KEY, session.accessToken);
    this.write(this.REFRESH_KEY, session.refreshToken);
  }

  public static readAccess(): string | null {
    return this.read(this.ACCESS_KEY);
  }

  public static readRefresh(): string | null {
    return this.read(this.REFRESH_KEY);
  }

  public static write(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  public static read(key: string): string | null {
    return localStorage.getItem(key);
  }
}
