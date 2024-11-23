import { Entity, PrimaryKey, Property, TextType } from '@mikro-orm/postgresql';

@Entity()
export class Article {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({ type: TextType })
  content: string = '';

  @Property({ default: false })
  public: boolean = false;
}
