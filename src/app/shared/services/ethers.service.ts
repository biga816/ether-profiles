import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

import { WalletModel } from '../models/wallet.model';

// utils
import { ETH } from '../utils/const';

// libs
// import Web3 from 'web3';
import * as ethers from 'ethers';
// import { default as contract } from 'truffle-contract';

declare let window: any;

@Injectable()
export class EthersService {
  currentProvider: any;
  currentNetworkId: number;
  networks: any[] = ETH.NETWORKS;
  defaultNetworks = 'ropsten';

  /**
   * Creates an instance of EthersService.
   * @memberof EthersService
   */
  constructor(
    private route: ActivatedRoute
  ) {
    this.defaultNetworks = this.route.snapshot.queryParams['networkName'] || this.defaultNetworks;
    this.setProvider(this.defaultNetworks);
  }

  setProvider(networkName: string) {
    const providers = ethers.providers;
    const network = providers.networks[networkName];

    // set networkId
    const networkObj =  this.networks.find((obj) => {
      return obj.name === networkName;
    });
    this.currentNetworkId = networkObj.id;

    // Connect to INFUA
    // const infuraProvider = new providers.InfuraProvider(network);
    // this.currentProvider = new providers.Web3Provider(window.web3.currentProvider, network);
    // this.currentProvider = new providers.InfuraProvider(network, '1jyxaSVQd74TDQH6IHbe');

    const infuraProvider = new providers.InfuraProvider(network, '1jyxaSVQd74TDQH6IHbe');
    const etherscanProvider = new providers.EtherscanProvider(network);

    this.currentProvider = new providers.FallbackProvider([
      infuraProvider,
      etherscanProvider
    ]);

  }

  /**
   *
   *
   * @param {string} mnemonic
   * @returns {WalletModel}
   * @memberof EthersService
   */
  getWalletFromMnemonic(mnemonic: string): WalletModel {
    const Wallet = ethers.Wallet;
    const wallet = Wallet.fromMnemonic(mnemonic);

    return {
      address: wallet.address,
      mnemonic: mnemonic,
      privateKey: wallet.privateKey
    };
  }

  /**
   *
   *
   * @param {string} address
   * @returns {Promise<number>}
   * @memberof EthersService
   */
  async getBalance(address: string): Promise<number> {
    return await this.currentProvider.getBalance(address).then((balance) => {
      // balance is a BigNumber (in wei); format is as a sting (in ether)
      return Number(ethers.utils.formatEther(balance));
    });
  }

  /**
   *
   *
   * @returns
   * @memberof EthersService
   */
  async getMetamaskAccounts() {
    const self = this;
    const signer = await this.currentProvider.listAccounts().then((accounts) => {
      return self.currentProvider.getSigner(accounts[1]);
    });

    return await signer.getAddress().then(data => {
      return data;
    });
  }

  /**
   *
   *
   * @param {any} artifacts
   * @param {any} [privateKey]
   * @returns
   * @memberof EthersService
   */
  getContract(artifacts, privateKey?) {
    const abi = artifacts.abi;
    const address = artifacts.networks[this.currentNetworkId].address;

    let wallet = this.currentProvider;
    if (privateKey) {
      wallet = new ethers.Wallet(privateKey, this.currentProvider);
    }

    return new ethers.Contract(address, abi, wallet);
  }

  watchTransactionReceipt(txHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = Observable
      .interval(500)
      .take(300)
      .subscribe(
        () => {
          this.currentProvider.getTransactionReceipt(txHash).then((transactionReceipt) => {
            if (transactionReceipt && transactionReceipt.blockNumber > 0) {
              subscription.unsubscribe();
              resolve(true);
            }
          });
        },
        (error) => reject(),
        () => resolve(false),
      );
    });
  }

  private getProvider(networkName: string) {
    const providers = ethers.providers;
    const network = providers.networks[networkName];

    const infuraProvider = new providers.InfuraProvider(network, '1jyxaSVQd74TDQH6IHbe');
    const etherscanProvider = new providers.EtherscanProvider(network);

    return new providers.FallbackProvider([
      infuraProvider,
      etherscanProvider
    ]);

  }

}
