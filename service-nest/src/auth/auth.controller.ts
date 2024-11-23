import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthSession, AuthUserDto, JwtFastifyRequest } from './dto/auth.dto';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { RefreshTokenGuard } from '../shared/guards/refresh-token.guard';
import { CreateUserDto } from '../users/contracts/user.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: 'Register as a new user' })
  public signUp(@Body() createUserDto: CreateUserDto): Observable<AuthSession> {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Log in your account' })
  public signIn(@Body() authUserDto: AuthUserDto): Observable<AuthSession> {
    return this.authService.signIn(authUserDto);
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Logout from current session' })
  public logout(@Req() request: JwtFastifyRequest): Observable<void> {
    return this.authService.logout(request.user.sub);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh current session' })
  public refresh(@Req() request: JwtFastifyRequest): Observable<AuthSession> {
    const { sub, refreshToken } = request.user;

    return this.authService.refreshTokens(sub, refreshToken);
  }
}
