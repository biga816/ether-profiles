import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';

// shared
import { SharedModule } from '../shared/shared.module';

// components
import { ProfileTopComponent } from './profile-top/profile-top.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    ProfileActions,
    ProfileService
  ],
  declarations: [
    ProfileTopComponent,
    ProfileDialogComponent
  ],
  entryComponents: [
    ProfileDialogComponent
  ]
})
export class ProfileModule {
}
