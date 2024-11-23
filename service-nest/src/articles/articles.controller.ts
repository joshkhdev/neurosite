import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { AuthRequired, Public, Role } from '@shared/decorators';
import { UserRole } from '@/users/models/user.interfaces';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './models/create-article.dto';
import { UpdateArticleDto } from './models/update-article.dto';
import { ArticleDto } from './models/article.dto';

@AuthRequired()
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @Role(UserRole.Moderator)
  @ApiOperation({ summary: 'Get all articles' })
  public findAll(): Observable<ArticleDto[]> {
    return this.articlesService
      .findAll()
      .pipe(map(articles => articles.map(article => new ArticleDto(article))));
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: 'Get all public articles' })
  public findAllPublic(): Observable<ArticleDto[]> {
    return this.articlesService
      .findAllPublic()
      .pipe(map(articles => articles.map(article => new ArticleDto(article))));
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get article by id' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  public findOne(@Param('id') id: string): Observable<ArticleDto> {
    return this.articlesService
      .findOne(+id)
      .pipe(map(article => new ArticleDto(article)));
  }

  @Post()
  @Role(UserRole.Moderator)
  @ApiOperation({ summary: 'Create new article' })
  public create(
    @Body() createArticleDto: CreateArticleDto,
  ): Observable<ArticleDto> {
    return this.articlesService
      .create(createArticleDto)
      .pipe(map(article => new ArticleDto(article)));
  }

  @Patch(':id')
  @Role(UserRole.Moderator)
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @Role(UserRole.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete article' })
  @ApiNoContentResponse({ description: 'Article deleted' })
  @ApiNotFoundResponse({ description: 'Article not found' })
  public remove(@Param('id') id: string): Observable<void> {
    return this.articlesService.remove(+id);
  }
}
