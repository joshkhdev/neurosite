import { Article } from './article.entity';

export class ArticleDto {
  public id: number;
  public title: string;
  public content: string;
  public isPublic: boolean;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.isPublic = article.isPublic;
  }
}
