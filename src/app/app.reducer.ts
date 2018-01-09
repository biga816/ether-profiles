import { Action } from 'redux';
import { AppActions } from './app.actions';

// shared
import { IPayloadAction } from './shared/utils/payload-action.types';

export interface ISnackbarInfo {
  message: string;
  date: Date;
}

export interface IAppState {
  snackbarInfo: ISnackbarInfo;
  accounts: string[];
  networkId: number;
}

export const INITIAL_STATE: IAppState = {
  snackbarInfo: null,
  accounts: [],
  networkId: null
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
    case AppActions.SET_ACCOUNT: {
      return {
        ...state,
        accounts: action.meta.accounts
      };
    }
    case AppActions.SET_NETWORK_NAME_SUCCESS: {
      return {
        ...state,
        networkId: action.meta.networkId
      };

    }
  }

  // We don't care about any other actions right now.
  return state;
}
