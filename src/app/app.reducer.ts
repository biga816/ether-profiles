import { Action } from 'redux';
import { AppActions } from './app.actions';

// shared
import { IPayloadAction } from './shared/utils/payload-action.types';
import { WalletModel } from './shared/models/wallet.model';

export interface ISnackbarInfo {
  message: string;
  date: Date;
}

export interface IAppState {
  snackbarInfo: ISnackbarInfo;
  networkName: string;
  ownerAddress: string;
  wallet: WalletModel;
}

export const INITIAL_STATE: IAppState = {
  snackbarInfo: null,
  networkName: null,
  ownerAddress: null,
  wallet: null
};

/**
 *
 *
 * @export
 * @param {IAppState} [state=INITIAL_STATE]
 * @param {Action} action
 * @returns {IAppState}
 */
export function appReducer(state: IAppState = INITIAL_STATE, action: IPayloadAction<any, any>): IAppState {
  switch (action.type) {
    case AppActions.SHOW_SNACKBAR: {
      return {
        ...state,
        snackbarInfo: { message: action.meta.message, date: new Date()}
      };
    }
    case AppActions.SET_NETWORK_NAME_SUCCESS: {
      return {
        ...state,
        networkName: action.meta.networkName
      };
    }
    case AppActions.GET_CONTRACT_OWNER_SUCCESS: {
      return {
        ...state,
        ownerAddress: action.meta.ownerAddress
      };
    }
    case AppActions.SET_WALLET: {
      return {
        ...state,
        wallet: action.meta.wallet
      };
    }
    case AppActions.REMOVE_WALLET: {
      return {
        ...state,
        wallet: null
      };
    }
    case AppActions.GET_BALANCE_SUCCESS: {
      const wallet = state.wallet;
      wallet.balance = action.meta.balance;
      return {
        ...state,
        wallet
      };
    }
  }

  // We don't care about any other actions right now.
  return state;
}
