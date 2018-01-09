import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTopComponent } from './history-top/history-top.component';

import { HistoryActions } from './history.actions';

// shared
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    HistoryActions
  ],
  declarations: [HistoryTopComponent]
})
export class HistoryModule { }
