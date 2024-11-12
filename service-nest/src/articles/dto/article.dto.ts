import { Article } from '../entities/article.entity';

export class ArticleDto {
  id: number;
  title: string;
  content: string;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
  }
}
