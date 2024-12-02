import { Article } from './article.entity';

export class ArticleDto {
  public readonly id: number;
  public readonly title: string;
  public readonly content: string;
  public readonly isPublic: boolean;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.isPublic = article.isPublic;
  }
}
