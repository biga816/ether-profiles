// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppActions } from './../app.actions';
import { AppService } from './../app.service';

// components
// import { SwiperContainer, SwiperSlide } from './components/swiper/swiper.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';

// directives
import { ClipboardDirective } from './directives/clipboard.directive';

// pipe
import { ToBrPipe } from './pipes/to-br.pipe';

// services
// import { ApiService } from './services/api.service';
import { Web3Service } from './services/web3.service';


// libs
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatListModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTabsModule, MatToolbarModule, MatChipsModule,
  MatInputModule, MatFormFieldModule, MatSelectModule, MatExpansionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    // components
    QrcodeComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    // directives
    ClipboardDirective,
    // Pope
    ToBrPipe
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // libs
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    FlexLayoutModule
  ],
  providers: [
    AppActions,
    AppService,
    // ApiService
    Web3Service,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // libs
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    FlexLayoutModule,
    // components
    QrcodeComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    // directives
    ClipboardDirective,
    // Pope
    ToBrPipe,
  ]
})
export class SharedModule {
}
