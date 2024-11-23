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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { Public, Role } from '@shared/decorators';
import { AuthUserEmailDto, JwtFastifyRequest } from '../auth/dto/auth.dto';
import { UpdateUserDto, UpdateUserRoleDto } from './contracts/user.dto';
import {
  UserProfileResponseDto,
  UserResponseDto,
} from './contracts/user-response.dto';
import { UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
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
  public findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Observable<UserResponseDto> {
    return this.usersService
      .findByUuid(uuid)
      .pipe(map(user => new UserResponseDto(user)));
  }

  @Patch(':id/role')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Update user role' })
  public updateRole(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateUserRoleDto,
  ): Observable<void> {
    return this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Block user' })
  public block(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Observable<void> {
    return this.usersService.changeIsBlocked(id, true);
  }

  @Post(':id/unblock')
  @Role(UserRole.Admin)
  @ApiOperation({ summary: 'Unblock user' })
  public unblock(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Observable<void> {
    return this.usersService.changeIsBlocked(id, false);
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

  @Get('profile/:name')
  @Public()
  @ApiOperation({ summary: 'Get user profile by name' })
  public getProfile(
    @Param('name') name: string,
  ): Observable<UserProfileResponseDto> {
    return this.usersService
      .findByName(name)
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
}
