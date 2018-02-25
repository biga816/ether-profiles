import { Injectable } from '@angular/core';
import { Action } from 'redux';

// shared
import { IPayloadAction } from './shared/utils/payload-action.types';
import { WalletModel } from './shared/models/wallet.model';

@Injectable()
export class AppActions {
  static SHOW_SNACKBAR = 'SHOW_SNACKBAR';

  static SET_NETWORK_NAME = 'SET_NETWORK_NAME';
  static SET_NETWORK_NAME_SUCCESS = 'SET_NETWORK_NAME_SUCCESS';
  static SET_NETWORK_NAME_ERROR = 'SET_NETWORK_NAME_ERROR';

  static GET_CONTRACT_OWNER = 'GET_CONTRACT_OWNER';
  static GET_CONTRACT_OWNER_SUCCESS = 'GET_CONTRACT_OWNER_SUCCESS';
  static GET_CONTRACT_OWNER_ERROR = 'GET_CONTRACT_OWNER_ERROR';

  static SET_WALLET = 'SET_WALLET';
  static REMOVE_WALLET = 'REMOVE_WALLET';

  static GET_BALANCE = 'GET_BALANCE';
  static GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
  static GET_BALANCE_ERROR = 'GET_BALANCE_ERROR';

  /**
   * Creates an instance of AppActions.
   * @memberof AppActions
   */
  constructor() {

  }

  /**
   *
   *
   * @param {string} network
   * @returns {IPayloadAction<any, any>}
   * @memberof AppActions
   */
  setNetworkName(networkName): IPayloadAction<any, any> {
    return {
      type: AppActions.SET_NETWORK_NAME,
      meta: { networkName }
    };
  }

  /**
   *
   *
   * @returns {IPayloadAction<any, any>}
   * @memberof AppActions
   */
  getContractOwner(): IPayloadAction<any, any> {
    return {
      type: AppActions.GET_CONTRACT_OWNER
    };
  }

  /**
   *
   *
   * @param {WalletModel} wallet
   * @returns {IPayloadAction<any, any>}
   * @memberof AppActions
   */
  setWallet(wallet: WalletModel): IPayloadAction<any, any> {
    return {
      type: AppActions.SET_WALLET,
      meta: { wallet }
    };
  }

  /**
   *
   *
   * @returns {IPayloadAction<any, any>}
   * @memberof AppActions
   */
  removeWallet(): IPayloadAction<any, any> {
    return {
      type: AppActions.REMOVE_WALLET
    };
  }
}
