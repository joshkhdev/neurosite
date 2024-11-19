import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserNameDto, UpdateUserRoleDto } from './contracts/user.dto';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { Role } from '../shared/decorators/role.decorator';
import { UserRole } from './entities/user.entity';
import { AuthUserEmailDto, JwtFastifyRequest } from 'src/auth/dto/auth.dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Role(UserRole.Moderator)
  @Get()
  public findAll() {
    return this.usersService.findAll();
  }

  @Role(UserRole.User)
  @Get('profile')
  public getProfile(@Req() request: JwtFastifyRequest) {
    return this.usersService.findOne(request.user.sub);
  }

  @Role(UserRole.User)
  @Get(':id')
  public findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  @Role(UserRole.Admin)
  @Patch(':id/role')
  public updateRole(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateDto: UpdateUserRoleDto,
  ) {
    return this.usersService.update(id, updateDto);
  }

  @Role(UserRole.User)
  @Patch(':id/name')
  public updateName(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserNameDto,
  ) {
    // TODO check if this is current user
    return this.usersService.update(id, updateDto);
  }

  @Role(UserRole.User)
  @Patch(':id/email')
  public updateEmail(
    @Param('id') id: string,
    @Body() updateDto: AuthUserEmailDto,
  ) {
    // TODO check if this is current user
    return this.usersService.update(id, updateDto);
  }

  @Role(UserRole.Admin)
  @Delete(':id')
  public block(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.changeIsBlocked(id, true);
  }

  @Role(UserRole.Admin)
  @Post(':id/unblock')
  public unblock(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.changeIsBlocked(id, false);
  }
}
