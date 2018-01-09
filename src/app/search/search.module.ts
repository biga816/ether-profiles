import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchActions } from './search.actions';

// shared
import { SharedModule } from '../shared/shared.module';

// components
import { SearchTopComponent } from './search-top/search-top.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    SearchActions,
  ],
  declarations: [
    SearchTopComponent,
  ],
})
export class SearchModule {
}
