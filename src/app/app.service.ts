import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

// shared
import { ProfileModel } from './shared/models/profile.model';

import { Web3Service } from './shared/services/web3.service';
import { EthersService } from './shared/services/ethers.service';
import profileCoreArtifacts from './../../build/contracts/ProfileCore.json';

@Injectable()
export class AppService {

  /**
   * Creates an instance of AppService.
   * @param {Web3Service} web3Service
   * @memberof AppService
   */
  constructor(
    // private web3Service: Web3Service,
    private ethersService: EthersService
  ) {
  }

  /**
   *
   *
   * @param {string} account
   * @returns
   * @memberof AppService
   */
  async callGetUserInfo(account: string) {
    try {
      const contract = this.ethersService.getContract(profileCoreArtifacts);
      const info = await contract.getUserInfo({ from: account });

      const currentProfile: ProfileModel = {
        accountAddress: info[0],
        name: info[1],
        description: info[2],
        profileUrl: info[3],
        createBlock: info[4],
        updateBlock: info[5]
      };

      return currentProfile;
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   *
   * @param {string} account
   * @param {string} txHash
   * @returns
   * @memberof AppService
   */
  async watchTransactionReceipt(account: string, txHash: string) {
    try {
      const hasReceipt = await this.ethersService.watchTransactionReceipt(txHash);
      if (!hasReceipt) {
        return;
      }
      const profile =  await this.callGetUserInfo(account);
      return profile;
    } catch (err) {
      throw err;
    }
  }


  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof AppService
   */
  async getContractOwner(): Promise<any> {
    try {
      const contract = this.ethersService.getContract(profileCoreArtifacts);
      const ownerAddress = await contract.owner.call();

      return ownerAddress;
    } catch (err) {
      throw err;
    }
  }
}
