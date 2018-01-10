import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

import { ActivatedRoute } from '@angular/router';

import { environment } from './../../../environments/environment';

// shared
import { URL } from './../utils/const';

declare let window: any;

@Injectable()
export class Web3Service {
  public ready = false;
  public MetaCoin: any;
  public accountsObservable = new Subject<string[]>();
  private web3: Web3;
  private accounts: string[];
  private refreshAccountsSub: Subscription;
  private networks = URL.INFURA;

  /**
   * Creates an instance of Web3Service.
   * @memberof Web3Service
   */
  constructor(
    private route: ActivatedRoute
  ) {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  /**
   *
   *
   * @memberof Web3Service
   */
  public bootstrapWeb3(): void {
    const networkId = this.route.snapshot.queryParams['networkId'];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 === 'undefined' || (networkId >= 0 && this.networks[networkId])) {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      const targetNetwork = this.networks[networkId] || environment.defaultNetwork;
      this.web3 = new Web3(new Web3.providers.HttpProvider(targetNetwork));
    } else {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    }

    this.refreshAccountsSub = Observable
      .interval(1500)
      .subscribe(() => this.refreshAccounts());
  }

  /**
   *
   *
   * @param {number} networkId
   * @memberof Web3Service
   */
  public updateWeb3(networkId?: number): boolean {
    if (!window.web3) {
      return false;
    }

    let targetHttpProvider = window.web3.currentProvider;
    if (networkId >= 0) {
      const targetNetworkUrl = this.networks[networkId] || environment.defaultNetwork;
      targetHttpProvider = new Web3.providers.HttpProvider(targetNetworkUrl);
    }
    this.web3 = new Web3(targetHttpProvider);

    return true;
  }

  /**
   *
   *
   * @returns
   * @memberof Web3Service
   */
  public async getNetworkId() {
    return await this.web3.eth.net.getId((id) => {
      return id;
    });
  }

  /**
   *
   *
   * @param {any} artifacts
   * @returns
   * @memberof Web3Service
   */
  public async artifactsToContract(artifacts): Promise<any> {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }

  /**
   *
   *
   * @param {string} txHash
   * @returns {Promise<any>}
   * @memberof Web3Service
   */
  public watchTransactionReceipt(txHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = Observable
      .interval(500)
      .take(20)
      .subscribe(
        () => {
          console.log('waiting...');
          this.web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
            if (error) {
              reject();
            } else {
              if (receipt.blockNumber > 0) {
                subscription.unsubscribe();
                resolve(true);
              }
            }
          });
        },
        (error) => reject(),
        () => resolve(false),
      );
    });
  }

  /**
   *
   *
   * @private
   * @memberof Web3Service
   */
  private refreshAccounts(): void {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      this.ready = true;
    });
  }
}
