import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { map, Observable } from 'rxjs';
import { ArticleDto } from './dto/article.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiOkResponse({
    description: 'Articles',
    type: [ArticleDto],
  })
  public findAll(): Observable<ArticleDto[]> {
    return this.articlesService
      .findAll()
      .pipe(
        map((articles) => articles.map((article) => new ArticleDto(article))),
      );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get article by id' })
  @ApiOkResponse({
    description: 'Article',
    type: ArticleDto,
  })
  @ApiNotFoundResponse({ description: 'Article not found' })
  public findOne(@Param('id') id: string): Observable<ArticleDto> {
    return this.articlesService
      .findOne(+id)
      .pipe(map((article) => new ArticleDto(article)));
  }

  @Post()
  @ApiOperation({ summary: 'Create new article' })
  @ApiCreatedResponse({ description: 'Article created', type: ArticleDto })
  public create(
    @Body() createArticleDto: CreateArticleDto,
  ): Observable<ArticleDto> {
    return this.articlesService
      .create(createArticleDto)
      .pipe(map((article) => new ArticleDto(article)));
  }

  @Patch(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Update article' })
  @ApiNoContentResponse({ description: 'Article updated' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  public update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Observable<void> {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete article' })
  @ApiNoContentResponse({ description: 'Article deleted' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  public remove(@Param('id') id: string): Observable<void> {
    return this.articlesService.remove(+id);
  }
}
