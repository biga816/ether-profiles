import { Action } from 'redux';
import { HistoryActions } from './history.actions';

// shared
import { IPayloadAction } from './../shared/utils/payload-action.types';

export interface ITxHash {
  networkName: string;
  hash: string;
}

export interface IHistoryState {
  txHashes: ITxHash[];
}

export const INITIAL_STATE: IHistoryState = {
  txHashes: []
};

/**
 *
 *
 * @export
 * @param {IHistoryState} [state=INITIAL_STATE]
 * @param {Action} action
 * @returns {IHistoryState}
 */
export function historyReducer(state: IHistoryState = INITIAL_STATE, action: IPayloadAction<any, any>): IHistoryState {
  switch (action.type) {
    case HistoryActions.SAVE_TX_HASH: {
      const txHashes = state.txHashes;
      txHashes.unshift({
        networkName: action.meta.networkName,
        hash: action.meta.txHash
      });

      return {
        ...state,
        txHashes: txHashes
      };
    }

  }

  return state;
}
