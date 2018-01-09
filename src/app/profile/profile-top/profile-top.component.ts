import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { NgRedux, select } from '@angular-redux/store';
import { IProfileState } from '../profile.reducer';
import { ProfileActions } from '../profile.actions';
import { ProfileService } from '../profile.service';

// components
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

// shared
import { ProfileModel } from './../../shared/models/profile.model';

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
  @select(['app', 'accounts']) readonly account$: Observable<any>;
  @select(['profile', 'profiles']) readonly profiles$: Observable<any>;
  @select(['app', 'networkId']) readonly networkId$: Observable<any>;

  accounts: string[];
  profiles: ProfileModel[];
  networkId: number;
  accountsSub: Subscription;
  profilesSub: Subscription;
  networkIdSub: Subscription;


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
    this.accountsSub = this.account$.subscribe((accounts: string[]) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      this.getProfile();
    });

    this.profilesSub = this.profiles$.subscribe((profiles: any[]) => {
      this.profiles = profiles;
    });

    this.networkIdSub = this.networkId$.subscribe((networkId: number) => {
      this.networkId = networkId;
    });
  }

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  ngOnDestroy(): void {
    this.accountsSub.unsubscribe();
    this.profilesSub.unsubscribe();
    this.networkIdSub.unsubscribe();
  }

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  getProfile(): void {
    this.ngRedux.dispatch(this.actions.featchProfile(this.model.account));
  }

  /**
   *
   *
   * @param {any} account
   * @memberof ProfileTopComponent
   */
  showModal(account): void {
    if (this.networkId <= 1) {
      alert('Please select Test network(Ropsten, Kovan, Rinkeby) at Metamask');
      return;
    }
    const profileIdx = this.profiles.findIndex((profile) => profile.accountAddress === account.toLowerCase());

    this.dialog.open(ProfileDialogComponent, {
      data: {
        account,
        profile: this.profiles[profileIdx],
        networkId: this.networkId
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

  /**
   *
   *
   * @memberof ProfileTopComponent
   */
  getAccount(): void {
    if (!this.service.updateWeb3()) {
      alert('You have to install Metamask!!');
    }
  }
}
