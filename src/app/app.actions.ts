import { Injectable } from '@angular/core';
import { Action } from 'redux';

// shared
import { IPayloadAction } from './shared/utils/payload-action.types';

@Injectable()
export class AppActions {
  static SHOW_SNACKBAR = 'SHOW_SNACKBAR';
  static SET_ACCOUNT = 'SET_ACCOUNT';

  static SET_NETWORK_NAME = 'SET_NETWORK_NAME';
  static SET_NETWORK_NAME_SUCCESS = 'SET_NETWORK_NAME_SUCCESS';
  static SET_NETWORK_NAME_ERROR = 'SET_NETWORK_NAME_ERROR';

  static GET_CONTRACT_OWNER = 'GET_CONTRACT_OWNER';
  static GET_CONTRACT_OWNER_SUCCESS = 'GET_CONTRACT_OWNER_SUCCESS';
  static GET_CONTRACT_OWNER_ERROR = 'GET_CONTRACT_OWNER_ERROR';

  /**
   * Creates an instance of AppActions.
   * @memberof AppActions
   */
  constructor() {

  }

  /**
   *
   *
   * @returns {Action}
   * @memberof AppActions
   */
  setAccounts(accounts: string[]): IPayloadAction<any, any> {
    return {
      type: AppActions.SET_ACCOUNT,
      meta: { accounts }
    };
  }

  /**
   *
   *
   * @param {string} network
   * @returns {IPayloadAction<any, any>}
   * @memberof AppActions
   */
  setNetworkName(): IPayloadAction<any, any> {
    return {
      type: AppActions.SET_NETWORK_NAME
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
}
