import { Injectable } from '@angular/core';
import { Action } from 'redux';

// shared
import { IPayloadAction } from './../shared/utils/payload-action.types';
import { ProfileModel } from './../shared/models/profile.model';

@Injectable()
export class ProfileActions {
  static FEATCH_PROFILE = 'FEATCH_PROFILE';
  static FEATCH_PROFILE_SUCCESS = 'FEATCH_PROFILE_SUCCESS';
  static FEATCH_PROFILE_ERROR = 'FEATCH_PROFILE_ERROR';

  static SAVE_PROFILE = 'SAVE_PROFILE';
  static SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
  static SAVE_PROFILE_ERROR = 'SAVE_PROFILE_ERROR';

  static REMOVE_PROFILE = 'REMOVE_PROFILE';

  static WATCH_TRANSACTION_RECEIPT = 'WATCH_TRANSACTION_RECEIPT';
  static WATCH_TRANSACTION_RECEIPT_SUCCESS = 'WATCH_TRANSACTION_RECEIPT_SUCCESS';
  static WATCH_TRANSACTION_RECEIPT_ERROR = 'WATCH_TRANSACTION_RECEIPT_ERROR';

  /**
   *
   *
   * @param {string} account
   * @returns {IPayloadAction<any, any>}
   * @memberof ProfileActions
   */
  featchProfile(account: string): IPayloadAction<any, any> {
    return {
      type: ProfileActions.FEATCH_PROFILE,
      payload: { account }
    };
  }

  /**
   *
   *
   * @param {ProfileModel} profile
   * @returns {IPayloadAction<any, any>}
   * @memberof ProfileActions
   */
  saveProfile(profile: ProfileModel, networkId: number): IPayloadAction<any, any> {
    return {
      type: ProfileActions.SAVE_PROFILE,
      meta: { networkId },
      payload: { profile }
    };
  }

  /**
   *
   *
   * @param {string} account
   * @returns {IPayloadAction<any, any>}
   * @memberof ProfileActions
   */
  removeProfile(account: string): IPayloadAction<any, any> {
    return {
      type: ProfileActions.REMOVE_PROFILE,
      meta: { account }
    };
  }
}
