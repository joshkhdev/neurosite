import { Entity, PrimaryKey, Property, TextType } from '@mikro-orm/postgresql';

@Entity()
export class Article {
  @PrimaryKey()
  public id: number;

  @Property()
  public title: string;

  @Property({ type: TextType })
  public content: string = '';

  @Property({ default: false })
  public isPublic: boolean = false;
}
