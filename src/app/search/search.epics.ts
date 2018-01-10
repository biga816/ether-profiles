import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Epic } from 'redux-observable-decorator';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// app
import { AppActions } from './../app.actions';
import { AppService } from './../app.service';

// search
import { SearchActions } from './search.actions';

// shared
import { IPayloadAction } from '../shared/utils/payload-action.types';

@Injectable()
export class SearchEpics {
  /**
   * Creates an instance of SearchEpics.
   * @param {AppService} appService
   * @memberof SearchEpics
   */
  constructor(
    private appService: AppService
  ) {}

  /**
   *
   *
   * @memberof SearchEpics
   */
  @Epic() searchProfile = (action$: ActionsObservable<any>) => {
    return action$.ofType(SearchActions.SEARCH_PROFILE)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return Observable.concat(
          // get user info
          this.appService.callGetUserInfo(payload.account)
            .then(profile => ({
                type: SearchActions.SEARCH_PROFILE_SUCCESS,
                meta: { profile }
              }))
            .catch(() => ({
                type: SearchActions.SEARCH_PROFILE_ERROR
              })),
          // ser network name
          Observable.of({
            type: AppActions.SET_NETWORK_NAME
          })
        );
      });
  }

}
