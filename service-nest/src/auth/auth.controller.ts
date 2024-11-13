import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthUserDto } from './dto/auth.dto';
import { Observable } from 'rxjs';
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js';
import { SupabaseJwtGuard } from './guard/supabase-jwt.guard';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @UseGuards(SupabaseJwtGuard)
  public authTest(): string {
    return 'Success';
  }

  @Post('sign-up')
  public signUp(@Body() user: AuthUserDto): Observable<AuthResponse> {
    return this.authService.signUp(user);
  }

  @Post('sign-in')
  public signIn(
    @Body() user: AuthUserDto,
  ): Observable<AuthTokenResponsePassword> {
    return this.authService.signIn(user);
  }

  // @Post('reset-password')
  // public resetPassword(@Body() user: AuthUserEmailDto) {
  //   return this.authService.sendResetPasswordLink(user.email);
  // }

  // @Post('update-password')
  // @UseGuards(SupabaseJwtGuard)
  // public updatePassword(
  //   @Body() user: AuthUserPasswordDto,
  // ): Observable<UserResponse> {
  //   return this.authService.updatePassword(user.password);
  // }
}
