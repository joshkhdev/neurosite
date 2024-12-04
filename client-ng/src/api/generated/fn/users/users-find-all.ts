/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserResponseDto } from '../../models/user-response-dto';

export interface UsersFindAll$Params {
}

export function usersFindAll(http: HttpClient, rootUrl: string, params?: UsersFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserResponseDto>>> {
  const rb = new RequestBuilder(rootUrl, usersFindAll.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserResponseDto>>;
    })
  );
}

usersFindAll.PATH = '/api/users';
