import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageStore {
  constructor() {}

  middleware = store => next => action => {
    const state = store.getState();
    localStorage.setItem('history-state', JSON.stringify(state.history));

    return next(action);
  }
}
