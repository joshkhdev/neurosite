/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { ArticleDto } from '../../models/article-dto';

export interface ArticlesFindAll$Params {
}

export function articlesFindAll(http: HttpClient, rootUrl: string, params?: ArticlesFindAll$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<Array<ArticleDto>>> {
  const rb = new ApiRequestBuilder(rootUrl, articlesFindAll.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as ApiStrictHttpResponse<Array<ArticleDto>>;
    })
  );
}

articlesFindAll.PATH = '/api/articles';
