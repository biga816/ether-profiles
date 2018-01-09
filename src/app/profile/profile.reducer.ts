import { Action } from 'redux';
import { ProfileActions } from './profile.actions';

// shared
import { ProfileModel } from './../shared/models/profile.model';
import { IPayloadAction } from './../shared/utils/payload-action.types';

export interface IProfileState {
  profiles: ProfileModel[];
}

export const INITIAL_STATE: IProfileState = {
  profiles: []
};

/**
 *
 *
 * @export
 * @param {IProfileState} [state=INITIAL_STATE]
 * @param {Action} action
 * @returns {IProfileState}
 */
export function profileReducer(state: IProfileState = INITIAL_STATE, action: IPayloadAction<any, any>): IProfileState {
  switch (action.type) {
    case ProfileActions.FEATCH_PROFILE_SUCCESS:
    case ProfileActions.WATCH_TRANSACTION_RECEIPT_SUCCESS: {
      const profiles = state.profiles;

      if (action.meta.profile && action.meta.profile.accountAddress !== '0x0000000000000000000000000000000000000000') {
        const accountIdx = state.profiles.findIndex((profile) => profile.accountAddress === action.meta.profile.accountAddress);
        if (accountIdx !== -1) {
          profiles[accountIdx] = action.meta.profile;
        } else {
          profiles.push(action.meta.profile);
        }
      }

      return {
        ...state,
        profiles: profiles
      };
    }
    case ProfileActions.REMOVE_PROFILE: {
      const profiles = state.profiles;
      const accountIdx = state.profiles.findIndex((profile) => profile.accountAddress === action.meta.account);

      if (accountIdx !== -1) {
        profiles.splice(accountIdx, 1);
      }

      return {
        ...state,
        profiles: profiles
      };
    }

  }

  // We don't care about any other actions right now.
  return state;
}
