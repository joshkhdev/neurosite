import { Article } from '../entities/article.entity';

export class ArticleDto {
  id: number;
  title: string;
  content: string;
  public: boolean;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.public = article.public;
  }
}
