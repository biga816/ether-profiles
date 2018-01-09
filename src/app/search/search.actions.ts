import { Injectable } from '@angular/core';
import { Action } from 'redux';

// shared
import { IPayloadAction } from './../shared/utils/payload-action.types';
import { ProfileModel } from './../shared/models/profile.model';

@Injectable()
export class SearchActions {
  static SEARCH_PROFILE = 'SEARCH_PROFILE';
  static SEARCH_PROFILE_SUCCESS = 'SEARCH_PROFILE_SUCCESS';
  static SEARCH_PROFILE_ERROR = 'SEARCH_PROFILE_ERROR';

  /**
   *
   *
   * @param {string} account
   * @returns {IPayloadAction<any, any>}
   * @memberof SearchActions
   */
  searchProfile(account: string): IPayloadAction<any, any> {
    return {
      type: SearchActions.SEARCH_PROFILE,
      payload: { account }
    };
  }
}
