import { Migration } from '@mikro-orm/migrations';

export class Migration20241123075235_UserDisplayName extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "display_name" varchar(255) not null;`);
  }

}
