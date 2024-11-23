import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  AuthRequired,
  AuthRequiredRefresh,
} from '@shared/decorators/auth-required.decorator';
import { AuthService } from './auth.service';
import { AuthSessionDto, AuthUserDto } from './models/auth.dto';
import { JwtFastifyRequest } from './models/auth.interfaces';
import { CreateUserDto } from '../users/models/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiConflictResponse({ description: 'Registration conflict' })
  public signUp(
    @Body() createUserDto: CreateUserDto,
  ): Observable<AuthSessionDto> {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Log in your account' })
  @ApiConflictResponse({ description: 'Unable to log in' })
  public signIn(@Body() authUserDto: AuthUserDto): Observable<AuthSessionDto> {
    return this.authService.signIn(authUserDto);
  }

  @Get('logout')
  @AuthRequired()
  @ApiOperation({ summary: 'Logout from current session' })
  public logout(@Req() request: JwtFastifyRequest): Observable<void> {
    return this.authService.logout(request.user.sub);
  }

  @Get('refresh')
  @AuthRequiredRefresh()
  @ApiOperation({ summary: 'Refresh current session' })
  public refresh(
    @Req() request: JwtFastifyRequest,
  ): Observable<AuthSessionDto> {
    const { sub, refreshToken } = request.user;

    return this.authService.refreshTokens(sub, refreshToken);
  }
}
