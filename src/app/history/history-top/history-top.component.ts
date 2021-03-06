import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ITxHash } from './../history.reducer';

// shared
import { URL } from './../../shared/utils/const';

// libs
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-history-top',
  templateUrl: './history-top.component.html',
  styleUrls: ['./history-top.component.scss']
})
export class HistoryTopComponent implements OnInit {
  @select(['history', 'txHashes']) readonly txHashes$: Observable<any>;

  etherscanUrl: Object = URL.ETHRSCAN;

  /**
   * Creates an instance of HistoryTopComponent.
   * @memberof HistoryTopComponent
   */
  constructor() {
  }

  /**
   *
   *
   * @memberof HistoryTopComponent
   */
  ngOnInit() {
  }

  /**
   *
   *
   * @param {ITxHash} txHash
   * @memberof HistoryTopComponent
   */
  openLink(txHash: ITxHash): void {
    const url = this.etherscanUrl[txHash.networkName] ? this.etherscanUrl[txHash.networkName].path : null;
    if (url) {
      setTimeout(() => {
        window.open(`${url}tx/${txHash.hash}`);
      }, 300);
    }
  }

}
