/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { ArticleDto } from '../../models/article-dto';
import { CreateArticleDto } from '../../models/create-article-dto';

export interface ArticlesCreate$Params {
      body: CreateArticleDto
}

export function articlesCreate(http: HttpClient, rootUrl: string, params: ArticlesCreate$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<ArticleDto>> {
  const rb = new ApiRequestBuilder(rootUrl, articlesCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as ApiStrictHttpResponse<ArticleDto>;
    })
  );
}

articlesCreate.PATH = '/api/articles';
