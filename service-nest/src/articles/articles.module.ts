import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './models/article.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
