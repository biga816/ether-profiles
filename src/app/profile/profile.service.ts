import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

// shared
import { ProfileModel } from '../shared/models/profile.model';

import { Web3Service } from '../shared/services/web3.service';
import profileCoreArtifacts from '../../../build/contracts/ProfileCore.json';

@Injectable()
export class ProfileService {

  /**
   * Creates an instance of ProfileService.
   * @param {Web3Service} web3Service
   * @memberof ProfileService
   */
  constructor(
    private web3Service: Web3Service,
  ) {
  }

  /**
   *
   *
   * @param {ProfileModel} profile
   * @returns
   * @memberof ProfileService
   */
  async sendSetUserInfo(profile: ProfileModel) {
    try {
      const profileCoreAbstraction = await this.web3Service.artifactsToContract(profileCoreArtifacts);
      const deployedProfileCore = await profileCoreAbstraction.deployed();

      // set parameters
      const params = [
        profile.name,
        profile.description || '',
        profile.profileUrl || '',
        { from: profile.accountAddress }
      ];

      const result = await deployedProfileCore.setUserInfo(...params);
      const transactionHash = result && result.receipt ? result.receipt.transactionHash : null;

      return transactionHash;
    } catch (err) {
      throw err;
    }
  }

  updateWeb3(): boolean {
    return this.web3Service.updateWeb3();
  }

}
