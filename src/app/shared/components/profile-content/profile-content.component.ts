import { Injectable, Inject, Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProfileModel } from './../../models/profile.model';

// libs
import { select } from '@angular-redux/store';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit, OnDestroy {
  @select(['app', 'networkId']) readonly networkId$: Observable<any>;
  @Input() public profile: ProfileModel;

  domain: string;
  networkId: number;
  networkIdSub: Subscription;

  private etherscanUrl = {
    1: 'https://etherscan.io/',
    3: 'https://ropsten.etherscan.io/',
    4: 'https://rinkeby.etherscan.io/',
    42: 'https://kovan.etherscan.io/'
  };


  /**
   * Creates an instance of ProfileContentComponent.
   * @param {ElementRef} elementRef
   * @param {MatSnackBar} snackBar
   * @memberof ProfileContentComponent
   */
  constructor(
    @Inject(ElementRef) private elementRef: ElementRef,
    public snackBar: MatSnackBar,
  ) {
    this.domain = location.origin;
  }

  /**
   *
   *
   * @memberof ProfileContentComponent
   */
  ngOnInit(): void {
    this.networkIdSub = this.networkId$.subscribe((networkId: number) => {
      this.networkId = networkId;
    });
  }

  /**
   *
   *
   * @memberof ProfileContentComponent
   */
  ngOnDestroy(): void {
    this.networkIdSub.unsubscribe();
  }

  /**
   *
   *
   * @param {number} id
   * @memberof ProfileTopComponent
   */
  openLink(id: number): void {
    const url = this.etherscanUrl[this.networkId];
    if (url) {
      setTimeout(() => {
        window.open(`${url}block/${id}`);
      }, 300);
    }
  }

  /**
   *
   *
   * @memberof ProfileContentComponent
   */
  copySuccess(): void {
    // show snack bar
    this.snackBar.open('Copied successfully', null, {
      duration: 2000
    });
  }
}
