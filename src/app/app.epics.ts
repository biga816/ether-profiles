import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Epic } from 'redux-observable-decorator';
import { AppActions } from './app.actions';
import { AppService } from './app.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// shared
import { IPayloadAction } from './shared/utils/payload-action.types';
import { Web3Service } from './shared/services/web3.service';

@Injectable()
export class AppEpics {
  constructor(
    private service: AppService,
    private web3Service: Web3Service
  ) {}

  @Epic() searchProfile = (action$: ActionsObservable<any>) => {
    return action$.ofType(AppActions.SET_NETWORK_NAME)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return this.web3Service.getNetworkId()
          .then(networkId => ({
              type: AppActions.SET_NETWORK_NAME_SUCCESS,
              meta: { networkId }
            }))
          .catch(() => ({
              type: AppActions.SET_NETWORK_NAME_ERROR
            }));
      });
  }

  @Epic() getContractOwner = (action$: ActionsObservable<any>) => {
    return action$.ofType(AppActions.GET_CONTRACT_OWNER)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return this.service.getContractOwner()
          .then(ownerAddress => ({
              type: AppActions.GET_CONTRACT_OWNER_SUCCESS,
              meta: { ownerAddress }
            }))
          .catch(() => ({
              type: AppActions.GET_CONTRACT_OWNER_ERROR
            }));
      });
  }
}
