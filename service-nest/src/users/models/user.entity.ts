import { Entity, Enum, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { UserRole } from './user.interfaces';

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

  @Property()
  displayName: string;

  @Enum({ items: () => UserRole, default: UserRole.User })
  role: UserRole;

  @Property({ type: 'boolean', default: false })
  isBlocked: boolean = false;

  @Property({ type: 'text', nullable: true })
  refreshToken?: string;
}
