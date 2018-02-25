import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState, ISnackbarInfo } from './app.reducer';
import { AppActions } from './app.actions';

// shared
// import { Web3Service } from './shared/services/web3.service';
import { EthersService } from './shared/services/ethers.service';
import { WEB3, ETH } from './shared/utils/const';
import { WalletDialogComponent } from './shared/components/wallet-dialog/wallet-dialog.component';
import { WalletModel } from './shared/models/wallet.model';

// libs
import { MatSidenav, MatSnackBar, MatDialog } from '@angular/material';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @select(['app', 'snackbarInfo']) readonly snackbarInfo$: Observable<any>;
  @select(['app', 'networkName']) readonly networkName$: Observable<any>;
  @select(['app', 'ownerAddress']) readonly ownerAddress$: Observable<any>;
  @select(['app', 'wallet']) readonly wallet$: Observable<any>;

  copyright: number = new Date().getFullYear();
  snackbarInfo: ISnackbarInfo;
  snackbarInfoSub: Subscription;
  networkNameSub: Subscription;
  walletSub: Subscription;
  mediaSub: Subscription;
  mqAlias = '';
  sideNavMode = 'over';
  isOpen = false;
  networkName: string;
  networks: any[] = ETH.NETWORKS;
  targetNetworkName = 'ropsten';
  myWallet: WalletModel;

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
    public dialog: MatDialog,
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions,
    // private web3Service: Web3Service,
    private ethersService: EthersService
  ) {
    this.watchSnackbarInfo();
    this.watchWallet();
    this.watchNetworkName();
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this.ngRedux.dispatch(this.actions.getContractOwner());

    this.watchMediaChange();
    this.watchSidenav();

    const defaultNetworks = this.ethersService.defaultNetworks;
    this.ngRedux.dispatch(this.actions.setNetworkName(defaultNetworks));
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
    this.snackbarInfoSub.unsubscribe();
    this.networkNameSub.unsubscribe();
    this.walletSub.unsubscribe();
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
   * @memberof AppComponent
   */
  copySuccess(): void {
    // show snack bar
    this.snackBar.open('Copied address successfully', null, {
      duration: 2000
    });
  }

  /**
   *
   *
   * @memberof AppComponent
   */
  showWalletDialog(): void {
    this.dialog.open(WalletDialogComponent, {
      data: { wallet: this.myWallet }
    });
  }

  changeNetwork(event): void {
    const targetNetwork = event.value;
    this.ethersService.setProvider(targetNetwork);
    this.ngRedux.dispatch(this.actions.setNetworkName(targetNetwork));
  }

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchSnackbarInfo(): void {
    this.snackbarInfoSub = this.snackbarInfo$.subscribe((snackbarInfo: ISnackbarInfo) => {
      if (!snackbarInfo) {
        return;
      }
      // show snack bar
      this.snackBar.open(snackbarInfo.message, null, {
        duration: 2000
      });
    });
  }

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchNetworkName(): void {
    this.networkNameSub = this.networkName$.subscribe((networkName: string) => {
      this.getBalance(this.myWallet);
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

  /**
   *
   *
   * @private
   * @memberof AppComponent
   */
  private watchWallet(): void {
    this.walletSub = this.wallet$.subscribe((wallet: WalletModel) => {
      this.myWallet = wallet;
      this.getBalance(wallet);
    });
  }

  /**
   *
   *
   * @private
   * @param {WalletModel} wallet
   * @returns
   * @memberof AppComponent
   */
  private getBalance(wallet: WalletModel) {
    if (!wallet) {
      return;
    }
    this.ethersService.getBalance(wallet.address).then((balance: number) => {
      wallet.balance = balance;
      this.ngRedux.dispatch(this.actions.setWallet(wallet));
    });
  }
}
