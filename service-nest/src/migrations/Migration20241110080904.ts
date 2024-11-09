import { Migration } from '@mikro-orm/migrations';

export class Migration20241110080904 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "article" ("id" serial primary key, "title" varchar(255) not null, "content" text not null default '');`);
  }

}
