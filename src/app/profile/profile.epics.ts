import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Epic } from 'redux-observable-decorator';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// app
import { AppActions } from './../app.actions';
import { AppService } from './../app.service';

// profile
import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';

// history
import { HistoryActions } from './../history/history.actions';

// shared
import { IPayloadAction } from '../shared/utils/payload-action.types';

@Injectable()
export class ProfileEpics {
  /**
   * Creates an instance of ProfileEpics.
   * @param {ProfileService} service
   * @memberof ProfileEpics
   */
  constructor(
    private service: ProfileService,
    private appService: AppService
  ) {}

  /**
   *
   *
   * @memberof ProfileEpics
   */
  @Epic() getProfile = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProfileActions.FEATCH_PROFILE)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return this.appService.callGetUserInfo(payload.account)
          .then(profile => ({
              type: ProfileActions.FEATCH_PROFILE_SUCCESS,
              meta: { profile }
            }))
          .catch(() => ({
              type: ProfileActions.SAVE_PROFILE_ERROR
            }));
      });
  }

  /**
   *
   *
   * @memberof ProfileEpics
   */
  @Epic() setProfile = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProfileActions.SAVE_PROFILE)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return this.service.sendSetUserInfo(payload.profile)
          .then(txHash => ({
              type: ProfileActions.WATCH_TRANSACTION_RECEIPT,
              meta: { networkId: meta.networkId },
              payload: {
                account: payload.profile.accountAddress,
                txHash
              }
            }))
          .catch(() => ({
              type: ProfileActions.SAVE_PROFILE_ERROR
            }));
      });
  }

  /**
   *
   *
   * @memberof ProfileEpics
   */
  @Epic() watchTransactionReceipt = (action$: ActionsObservable<any>) => {
    return action$.ofType(ProfileActions.WATCH_TRANSACTION_RECEIPT)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return Observable.concat(
          // show snackbar
          Observable.of({
            type: AppActions.SHOW_SNACKBAR,
            meta: { message: 'Saved successfully' }
          }),
          // save tx hash
          Observable.of({
            type: HistoryActions.SAVE_TX_HASH,
            meta: {
              networkId: meta.networkId,
              txHash: payload.txHash
            }
          }),
          // watch transaction receipt
          this.appService.watchTransactionReceipt(payload.account, payload.txHash)
            .then(profile => ({
                type: ProfileActions.WATCH_TRANSACTION_RECEIPT_SUCCESS,
                meta: { profile }
              }))
            .catch(() => ({
                type: ProfileActions.WATCH_TRANSACTION_RECEIPT_ERROR
              }))
        );
      });
  }

}
