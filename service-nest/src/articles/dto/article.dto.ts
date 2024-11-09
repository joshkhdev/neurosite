import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';

export class ArticleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
  }
}
