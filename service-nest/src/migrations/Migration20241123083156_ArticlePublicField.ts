import { Migration } from '@mikro-orm/migrations';

export class Migration20241123083156_ArticlePublicField extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "article" add column "public" boolean not null default false;`);
  }

}
