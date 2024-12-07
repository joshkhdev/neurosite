/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiStrictHttpResponse } from '../../api-strict-http-response';
import { ApiRequestBuilder } from '../../api-request-builder';

import { UserProfileResponseDto } from '../../models/user-profile-response-dto';

export interface UsersGetUserProfile$Params {
}

export function usersGetUserProfile(http: HttpClient, rootUrl: string, params?: UsersGetUserProfile$Params, context?: HttpContext): Observable<ApiStrictHttpResponse<UserProfileResponseDto>> {
  const rb = new ApiRequestBuilder(rootUrl, usersGetUserProfile.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as ApiStrictHttpResponse<UserProfileResponseDto>;
    })
  );
}

usersGetUserProfile.PATH = '/api/users/profile';
