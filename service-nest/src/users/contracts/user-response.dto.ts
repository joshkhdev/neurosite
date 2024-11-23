import { User, UserRole } from '../entities/user.entity';

export interface IUserResponse {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly displayName: string;
  readonly role: UserRole;
  readonly isBlocked: boolean;
}

export class UserResponseDto implements IUserResponse {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly displayName: string;
  public readonly role: UserRole;
  public readonly isBlocked: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.displayName = user.displayName;
    this.role = user.role;
    this.isBlocked = user.isBlocked;
  }
}

export interface IUserProfileResponse {
  readonly name: string;
  readonly displayName: string;
}

export class UserProfileResponseDto implements IUserProfileResponse {
  public readonly name: string;
  public readonly displayName: string;

  constructor(user: User) {
    this.name = user.name;
    this.displayName = user.displayName;
  }
}
