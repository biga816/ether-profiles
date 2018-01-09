import { Injectable } from '@angular/core';
import { Action } from 'redux';

// shared
import { IPayloadAction } from './../shared/utils/payload-action.types';

@Injectable()
export class HistoryActions {
  static SAVE_TX_HASH = 'SAVE_TX_HASH';
}
