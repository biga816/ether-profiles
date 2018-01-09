import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState, ISnackbarInfo } from './app.reducer';
import { AppActions } from './app.actions';

// shared
import { Web3Service } from './shared/services/web3.service';
import { WEB3 } from './shared/utils/const';

// libs
import { MatSidenav, MatSnackBar } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @select(['app', 'snackbarInfo']) readonly snackbarInfo$: Observable<any>;
  @select(['app', 'accounts']) readonly account$: Observable<any>;
  @select(['app', 'networkId']) readonly networkId$: Observable<any>;

  copyright: number = new Date().getFullYear();
  snackbarInfo: ISnackbarInfo;
  snackbarInfoSub: Subscription;
  networkIdSub: Subscription;
  mediaSub: Subscription;
  mqAlias = '';
  sideNavMode = 'over';
  isOpen = false;
  networkName: string;

  model = {
    network: null
  };

  pages = [
    { url: '/', name: 'Home' },
    { url: '/search', name: 'Search' },
    { url: '/history', name: 'History' },
  ];

  /**
   * Creates an instance of AppComponent.
   * @param {NgRedux<IAppState>} ngRedux
   * @param {AppActions} actions
   * @param {Web3Service} web3Service
   * @param {MatSnackBar} snackBar
   * @memberof AppComponent
   */
  constructor(
    public snackBar: MatSnackBar,
    public media: ObservableMedia,
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions,
    private web3Service: Web3Service
  ) {
    this.snackbarInfoSub = this.snackbarInfo$.subscribe((snackbarInfo: ISnackbarInfo) => {
      if (!snackbarInfo) {
        return;
      }
      // show snack bar
      this.snackBar.open(snackbarInfo.message, null, {
        duration: 2000
      });
    });

    this.networkIdSub = this.networkId$.subscribe((networkId: number) => {
      this.networkName = WEB3.NETWORK[networkId] || WEB3.NETWORK['unknown'];
      this.model.network = networkId;
    });
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this.watchAccount();
    this.watchMediaChange();
    this.watchSidenav();
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
    this.snackbarInfoSub.unsubscribe();
    this.networkIdSub.unsubscribe();
  }

  /**
   *
   *
   * @param {boolean} isOpen
   * @memberof AppComponent
   */
  toggelSidnav(isOpen: boolean): void {
    this.sidenav.toggle();
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  closeSidnav(): void {
    if ( this.mqAlias === 'xs' || this.mqAlias === 'sm') {
      this.sidenav.close();
    }
  }

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchAccount(): void {
    setTimeout(() => {
      this.ngRedux.dispatch(this.actions.setNetworkName());
    }, 1000);

    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.ngRedux.dispatch(this.actions.setAccounts(accounts));
      this.ngRedux.dispatch(this.actions.setNetworkName());
    });
  }

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchMediaChange(): void {
    const self = this;

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.mqAlias = change.mqAlias;
      if ( this.mqAlias === 'xs' || this.mqAlias === 'sm') {
        this.sideNavMode = 'over';
        setTimeout(() => self.sidenav.close(), 100);
      } else {
        this.sideNavMode = 'side';
        setTimeout(() => self.sidenav.open(), 100);
      }
    });
  }

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchSidenav(): void {
    this.sidenav.onOpen.subscribe(() => {
      this.isOpen = true;
    });
    this.sidenav.onClose.subscribe(() => {
      this.isOpen = false;
    });
  }
}
