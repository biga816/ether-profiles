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
// import { Web3Service } from './shared/services/web3.service';
import { EthersService } from './shared/services/ethers.service';

@Injectable()
export class AppEpics {
  constructor(
    private service: AppService,
    // private web3Service: Web3Service
    private ethersService: EthersService
  ) {}

  @Epic() setNetworkName = (action$: ActionsObservable<any>) => {
    return action$.ofType(AppActions.SET_NETWORK_NAME)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        this.ethersService.setProvider(meta.networkName);

        return Observable.of({
          type: AppActions.SET_NETWORK_NAME_SUCCESS,
          meta: { networkName: meta.networkName }
        });
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

  @Epic() setWallet = (action$: ActionsObservable<any>) => {
    return action$.ofType(AppActions.GET_BALANCE)
      .mergeMap(({ payload, meta }: IPayloadAction<any, any>) => {
        return this.ethersService.getBalance(meta.address)
          .then(balance => ({
              type: AppActions.GET_BALANCE_SUCCESS,
              meta: { balance }
            }))
          .catch(() => ({
              type: AppActions.GET_BALANCE_ERROR
            }));
      });
  }
}
