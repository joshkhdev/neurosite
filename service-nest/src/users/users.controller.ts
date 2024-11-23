import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { AuthRequired, Public, Role } from '@shared/decorators';
import { JwtFastifyRequest } from '@/auth/models/auth.interfaces';
import { AuthUserEmailDto } from '@/auth/models/auth.dto';
import { UpdateUserDto, UpdateUserRoleDto } from './models/user.dto';
import {
  UserProfileResponseDto,
  UserResponseDto,
} from './models/user-response.dto';
import { UserRole } from './models/user.interfaces';
import { UsersService } from './users.service';

@AuthRequired()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Role(UserRole.Moderator)
  @ApiOperation({ summary: 'Get all users' })
  public findAll() {
    return this.usersService
      .findAll()
      .pipe(map(users => users.map(user => new UserResponseDto(user))));
  }

  @Get(':uuid')
  @Role(UserRole.Moderator)
  @ApiOperation({ summary: 'Get user by uuid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Observable<UserResponseDto> {
    return this.usersService
      .findByUuid(uuid)
      .pipe(map(user => new UserResponseDto(user)));
  }

  @Patch(':uuid/role')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Update user role' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public updateRole(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() updateDto: UpdateUserRoleDto,
  ): Observable<void> {
    return this.usersService.update(uuid, updateDto);
  }

  @Delete(':uuid')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Block user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public block(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Observable<void> {
    return this.usersService.changeIsBlocked(uuid, true);
  }

  @Post(':uuid/unblock')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Unblock user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public unblock(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Observable<void> {
    return this.usersService.changeIsBlocked(uuid, false);
  }

  @Get('profile')
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Get current user profile' })
  public getUserProfile(
    @Req() request: JwtFastifyRequest,
  ): Observable<UserProfileResponseDto> {
    return this.usersService
      .findByUuid(request.user.sub)
      .pipe(map(user => new UserProfileResponseDto(user)));
  }

  @Patch('profile')
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Update current user profile' })
  public update(
    @Req() request: JwtFastifyRequest,
    @Body() updateDto: UpdateUserDto,
  ): Observable<void> {
    return this.usersService.update(request.user.sub, updateDto);
  }

  @Patch('profile/email')
  @Role(UserRole.User)
  @ApiOperation({ summary: 'Update current user email' })
  public updateEmail(
    @Req() request: JwtFastifyRequest,
    @Body() updateDto: AuthUserEmailDto,
  ): Observable<void> {
    return this.usersService.update(request.user.sub, updateDto);
  }

  @Get('profile/:name')
  @Public()
  @ApiOperation({ summary: 'Get user profile by name' })
  @ApiNotFoundResponse({ description: 'User not found' })
  public getProfile(
    @Param('name') name: string,
  ): Observable<UserProfileResponseDto> {
    return this.usersService
      .findByName(name)
      .pipe(map(user => new UserProfileResponseDto(user)));
  }
}
