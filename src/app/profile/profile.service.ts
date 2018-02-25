import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

// shared
import { ProfileModel } from '../shared/models/profile.model';

// import { Web3Service } from '../shared/services/web3.service';
import { EthersService } from '../shared/services/ethers.service';
import profileCoreArtifacts from '../../../build/contracts/ProfileCore.json';

@Injectable()
export class ProfileService {

  /**
   * Creates an instance of ProfileService.
   * @param {Web3Service} web3Service
   * @memberof ProfileService
   */
  constructor(
    // private web3Service: Web3Service,
    private ethersService: EthersService
  ) {
  }

  /**
   *
   *
   * @param {ProfileModel} profile
   * @returns
   * @memberof ProfileService
   */
  async sendSetUserInfo(profile: ProfileModel, privateKey: string) {
    try {
      const contract = this.ethersService.getContract(profileCoreArtifacts, privateKey);

      // set parameters
      const params = [
        profile.name,
        profile.description || '',
        profile.profileUrl || ''
      ];

      const result = await contract.setUserInfo(...params);
      const transactionHash = result ? result.hash : null;

      return transactionHash;
    } catch (err) {
      throw err;
    }
  }

}
