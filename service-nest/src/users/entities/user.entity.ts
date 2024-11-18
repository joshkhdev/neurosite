import {
  Entity,
  Enum,
  Index,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

export enum UserRole {
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Index()
  @Property()
  email: string;

  @Property()
  password: string;

  @Unique()
  @Property()
  name: string;

  @Enum({ items: () => UserRole, default: UserRole.User })
  role: UserRole;

  @Property({ type: 'boolean', default: false })
  isBlocked: boolean = false;

  @Property({ type: 'text', nullable: true })
  refreshToken?: string;
}
