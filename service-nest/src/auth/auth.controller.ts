import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthUserDto, CreateUserDto, JwtFastifyRequest } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  @UseGuards(AccessTokenGuard)
  public test() {
    return 'Success';
  }

  @Post('sign-up')
  public signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  public signIn(@Body() authUserDto: AuthUserDto) {
    return this.authService.signIn(authUserDto);
  }

  @Get('logout')
  public logout(@Req() request: JwtFastifyRequest) {
    return this.authService.logout(request.user.sub);
  }
}
