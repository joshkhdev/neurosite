/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { AuthSessionDto } from '../../models/auth-session-dto';
import { AuthUserDto } from '../../models/auth-user-dto';

export interface AuthSignIn$Params {
      body: AuthUserDto
}

export function authSignIn(http: HttpClient, rootUrl: string, params: AuthSignIn$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<AuthSessionDto>> {
  const rb = new ApiRequestBuilder(rootUrl, authSignIn.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as ApiStrictHttpResponse<AuthSessionDto>;
    })
  );
}

authSignIn.PATH = '/api/auth/sign-in';
