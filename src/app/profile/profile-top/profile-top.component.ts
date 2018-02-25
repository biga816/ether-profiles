import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NgRedux, select } from '@angular-redux/store';
import { IProfileState } from '../profile.reducer';
import { ProfileActions } from '../profile.actions';
import { ProfileService } from '../profile.service';

// components
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

// shared
import { ProfileModel } from './../../shared/models/profile.model';
import { WalletModel } from '../../shared/models/wallet.model';

// contracts
import profileCoreArtifacts from '../../../../build/contracts/ProfileCore.json';

// libs
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-top',
  templateUrl: './profile-top.component.html',
  styleUrls: ['./profile-top.component.scss']
})
export class ProfileTopComponent implements OnInit, OnDestroy {
  @select(['profile', 'profiles']) readonly profiles$: Observable<any>;
  @select(['app', 'networkName']) readonly networkName$: Observable<any>;
  @select(['app', 'wallet']) readonly wallet$: Observable<any>;

  profiles: ProfileModel[];
  networkName: number;
  wallet: WalletModel;

  profilesSub: Subscription;
  networkNameSub: Subscription;
  walletSub: Subscription;


  model = {
    account: ''
  };

  /**
   * Creates an instance of ProfileTopComponent.
   * @param {MatDialog} dialog
   * @param {NgRedux<IProfileState>} ngRedux
   * @param {ProfileActions} actions
   * @memberof ProfileTopComponent
   */
  constructor(
    private dialog: MatDialog,
    private ngRedux: NgRedux<IProfileState>,
    private actions: ProfileActions,
    private service: ProfileService
  ) {
  }

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  ngOnInit(): void {
    this.profilesSub = this.profiles$.subscribe((profiles: any[]) => {
      this.profiles = profiles;
    });

    this.networkNameSub = this.networkName$.subscribe((networkName: number) => {
      this.networkName = networkName;
      this.getProfile();
    });

    this.walletSub = this.wallet$.subscribe((wallet: WalletModel) => {
      this.wallet = wallet;
      this.getProfile();
    });

  }

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  ngOnDestroy(): void {
    this.profilesSub.unsubscribe();
    this.networkNameSub.unsubscribe();
    this.walletSub.unsubscribe();
  }

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  getProfile(): void {
    if (!this.wallet) {
      return;
    }

    this.ngRedux.dispatch(this.actions.featchProfile(this.wallet.address));
  }

  /**
   *
   *
   * @param {any} account
   * @memberof ProfileTopComponent
   */
  showModal(): void {
    if (!this.networkName) {
      alert('Please select Test network(Ropsten, Kovan, Rinkeby) at Metamask');
      return;
    }

    const profileIdx = this.profiles.findIndex((profile) => profile.accountAddress.toLowerCase() === this.wallet.address.toLowerCase());

    this.dialog.open(ProfileDialogComponent, {
      data: {
        account: this.wallet.address,
        profile: this.profiles[profileIdx],
        networkName: this.networkName,
        wallet: this.wallet
      }
    });
  }

  /**
   *
   *
   * @param {any} account
   * @memberof ProfileTopComponent
   */
  remove(account): void {
    this.ngRedux.dispatch(this.actions.removeProfile(account));
  }

}
