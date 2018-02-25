import { Component, Inject, ViewChild } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../app.reducer';
import { AppActions } from '../../../app.actions';

// shared
import { WalletModel } from '../../models/wallet.model';
import { EthersService } from '../../services/ethers.service';

// libs
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as ethers from 'ethers';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: 'wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.scss']
})
export class WalletDialogComponent {

  wallet: WalletModel;
  isShowSecret: Boolean = false;
  mnemonic: string;

  /**
   * Creates an instance of WalletDialogComponent.
   * @param {MatDialogRef<WalletDialogComponent>} dialogRef
   * @param {*} data
   * @param {NgRedux<IProfileState>} ngRedux
   * @param {ProfileActions} actions
   * @memberof WalletDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<WalletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngRedux: NgRedux<IAppState>,
    private actions: AppActions,
    private ethersService: EthersService
  ) {
    this.wallet = this.data.wallet;

  }

  /**
   *
   *
   * @memberof WalletDialogComponent
   */
  close(): void {
    this.dialogRef.close();
  }

  change(e: any) {
    this.isShowSecret = e.checked;
  }

  import() {
    if (!this.mnemonic) {
     return;
    }

    const myWallet = this.ethersService.getWalletFromMnemonic(this.mnemonic);

    this.ngRedux.dispatch(this.actions.setWallet(myWallet));
    this.dialogRef.close();
  }

  removeAddress() {
    this.ngRedux.dispatch(this.actions.removeWallet());
    this.dialogRef.close();
  }

  async importMetamask() {
    const address = await this.ethersService.getMetamaskAccounts();

    const myWallet = { address };
    this.ngRedux.dispatch(this.actions.setWallet(myWallet));
    this.dialogRef.close();
  }
}
