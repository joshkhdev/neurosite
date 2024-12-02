import { Migration } from '@mikro-orm/migrations';

export class Migration20241123151407_InitialCreate extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "article" ("id" serial primary key, "title" varchar(255) not null, "content" text not null default '', "is_public" boolean not null default false);`);

    this.addSql(`create table "user" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "name" varchar(255) not null, "display_name" varchar(255) not null, "role" text check ("role" in ('user', 'moderator', 'admin')) not null default 'user', "is_blocked" boolean not null default false, "refresh_token" text null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`create index "user_email_index" on "user" ("email");`);
    this.addSql(`alter table "user" add constraint "user_name_unique" unique ("name");`);
  }

}
