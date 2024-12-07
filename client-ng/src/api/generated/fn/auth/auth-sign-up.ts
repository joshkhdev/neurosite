/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { AuthSessionDto } from '../../models/auth-session-dto';
import { CreateUserDto } from '../../models/create-user-dto';

export interface AuthSignUp$Params {
      body: CreateUserDto
}

export function authSignUp(http: HttpClient, rootUrl: string, params: AuthSignUp$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<AuthSessionDto>> {
  const rb = new ApiRequestBuilder(rootUrl, authSignUp.PATH, 'post');
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

authSignUp.PATH = '/api/auth/sign-up';
