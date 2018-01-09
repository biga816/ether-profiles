import { combineReducers } from 'redux';
import { appReducer } from './app.reducer';
import { profileReducer } from './profile/profile.reducer';
import { searchReducer } from './search/search.reducer';
import { historyReducer } from './history/history.reducer';

export interface IAppState {
  app?: any;
  profile?: any;
  search?: any;
  history?: any;
}

export const rootReducer =
  combineReducers({
    app: appReducer,
    profile: profileReducer,
    search: searchReducer,
    history: historyReducer
  });
