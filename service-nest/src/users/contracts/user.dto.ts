import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUserDto } from '../../auth/dto/auth.dto';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto extends AuthUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly displayName: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public readonly name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public readonly displayName: string;
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
