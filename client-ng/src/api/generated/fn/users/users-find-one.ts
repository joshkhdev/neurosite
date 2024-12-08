/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { UserResponseDto } from '../../models/user-response-dto';

export interface UsersFindOne$Params {
  uuid: string;
}

export function usersFindOne(http: HttpClient, rootUrl: string, params: UsersFindOne$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<UserResponseDto>> {
  const rb = new ApiRequestBuilder(rootUrl, usersFindOne.PATH, 'get');
  if (params) {
    rb.path('uuid', params.uuid, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as ApiStrictHttpResponse<UserResponseDto>;
    })
  );
}

usersFindOne.PATH = '/api/users/{uuid}';
