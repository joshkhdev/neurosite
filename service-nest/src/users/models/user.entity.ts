import { Entity, Enum, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { UserRole } from './user.interfaces';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  public id: string;

  @Index()
  @Property()
  public email: string;

  @Property()
  public password: string;

  @Unique()
  @Property()
  public name: string;

  @Property()
  public displayName: string;

  @Enum({ items: () => UserRole, default: UserRole.User })
  public role: UserRole;

  @Property({ type: 'boolean', default: false })
  public isBlocked: boolean = false;

  @Property({ type: 'text', nullable: true })
  public refreshToken?: string;
}
