import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgRedux, select } from '@angular-redux/store';
import { IProfileState } from '../profile.reducer';
import { ProfileActions } from '../profile.actions';

// shared
import { ProfileModel } from './../../shared/models/profile.model';
import { WalletModel } from '../../shared/models/wallet.model';

// libs
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: 'profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent {

  account: string;
  profileCore: any;
  profileForm: FormGroup;
  profile: ProfileModel;
  networkName: string;
  wallet: WalletModel;

  /**
   * Creates an instance of ProfileDialogComponent.
   * @param {MatDialogRef<ProfileDialogComponent>} dialogRef
   * @param {FormBuilder} fb
   * @param {*} data
   * @param {NgRedux<IProfileState>} ngRedux
   * @param {ProfileActions} actions
   * @memberof ProfileDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngRedux: NgRedux<IProfileState>,
    private actions: ProfileActions,
  ) {
    this.account = this.data.account;
    this.profile = this.data.profile || {};
    this.networkName = this.data.networkName;
    this.wallet = this.data.wallet;

    this.profileForm = fb.group({
      address: [{value: this.account, disabled: true}],
      name: [this.profile.name, Validators.required],
      description: [this.profile.description],
      profileUrl: [this.profile.profileUrl]
    });
  }

  /**
   *
   *
   * @memberof ProfileDialogComponent
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   *
   *
   * @memberof ProfileDialogComponent
   */
  setProfile() {
    if (this.profileForm.dirty && this.profileForm.valid) {
      const userInfo: ProfileModel = {
        accountAddress: this.account,
        name: this.profileForm.value.name,
        description: this.profileForm.value.description,
        profileUrl: this.profileForm.value.profileUrl
      };

      this.ngRedux.dispatch(this.actions.saveProfile(userInfo, this.networkName, this.wallet.privateKey));
      this.dialogRef.close();
    }
  }
}
