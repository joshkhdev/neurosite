import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: EntityRepository<Article>,
    private readonly em: EntityManager,
  ) {}

  public findAll(): Observable<Article[]> {
    return from(this.articlesRepository.findAll());
  }

  public findOne(id: number): Observable<Article> {
    return from(this.articlesRepository.findOne(id)).pipe(
      map((article) => {
        if (!article) {
          throw new NotFoundException(`Article with id=${id} was not found`);
        }

        return article;
      }),
    );
  }

  public create(createArticleDto: CreateArticleDto): Observable<Article> {
    const article = new Article();

    wrap(article).assign(createArticleDto, { em: this.em });

    return from(this.em.persistAndFlush(article)).pipe(map(() => article));
  }

  public update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Observable<void> {
    return this.findOne(id).pipe(
      switchMap((article) => {
        wrap(article).assign(updateArticleDto);

        return from(this.em.persistAndFlush(article));
      }),
    );
  }

  public remove(id: number): Observable<void> {
    return this.findOne(id).pipe(
      switchMap((article) => {
        return from(this.em.removeAndFlush(article));
      }),
    );
  }
}
