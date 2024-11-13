import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import mikroOrmConfig from 'mikro-orm.config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './.env'],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        clientUrl: config.get('SUPABASE_DB_URL'),
        ...mikroOrmConfig,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client/browser'),
    }),
    ArticlesModule,
    AuthModule,
  ],
})
export class AppModule {}
