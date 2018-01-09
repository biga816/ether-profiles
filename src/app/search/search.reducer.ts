import { Action } from 'redux';
import { SearchActions } from './search.actions';

// shared
import { ProfileModel } from './../shared/models/profile.model';
import { IPayloadAction } from './../shared/utils/payload-action.types';

export interface ISearchState {
  profile: ProfileModel;
}

export const INITIAL_STATE: ISearchState = {
  profile: null
};

/**
 *
 *
 * @export
 * @param {IProfileState} [state=INITIAL_STATE]
 * @param {Action} action
 * @returns {IProfileState}
 */
export function searchReducer(state: ISearchState = INITIAL_STATE, action: IPayloadAction<any, any>): ISearchState {
  switch (action.type) {
    case SearchActions.SEARCH_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.meta.profile
      };
    }

  }

  // We don't care about any other actions right now.
  return state;
}
