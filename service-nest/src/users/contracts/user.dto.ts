import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { AuthUserDto } from '../../auth/dto/auth.dto';

export interface IUpdateUser {
  readonly name: string;
}

export class CreateUserDto extends AuthUserDto implements IUpdateUser {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly name: string;
}

export class UpdateUserNameDto implements IUpdateUser {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly name: string;
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
