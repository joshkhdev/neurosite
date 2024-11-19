import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthUserDto, JwtFastifyRequest } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RefreshTokenGuard } from '../shared/guards/refresh-token.guard';
import { CreateUserDto } from '../users/contracts/user.dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  public signIn(@Body() authUserDto: AuthUserDto) {
    return this.authService.signIn(authUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  public logout(@Req() request: JwtFastifyRequest) {
    return this.authService.logout(request.user.sub);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  public refreshTokens(@Req() request: JwtFastifyRequest) {
    const { sub, refreshToken } = request.user;

    return this.authService.refreshTokens(sub, refreshToken);
  }
}
