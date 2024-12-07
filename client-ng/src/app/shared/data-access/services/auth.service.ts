import { Injectable } from '@angular/core';
import { AuthSessionDto, AuthUserDto, CreateUserDto } from '@api/models';
import { AuthApiService } from '@api/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly authApiService: AuthApiService) {}

  public signUp(createUserDto: CreateUserDto): Observable<AuthSessionDto> {
    return this.authApiService.authSignUp({ body: createUserDto });
  }

  public signIn(authUserDto: AuthUserDto): Observable<AuthSessionDto> {
    return this.authApiService.authSignIn({ body: authUserDto });
  }

  public refresh(): Observable<AuthSessionDto> {
    return this.authApiService.authRefresh();
  }

  public logout(): Observable<void> {
    return this.authApiService.authLogout();
  }
}
