import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { NgRedux, select } from '@angular-redux/store';
import { ISearchState } from '../search.reducer';
import { SearchActions } from '../search.actions';

import { ProfileModel } from './../../shared/models/profile.model';
import profileCoreArtifacts from '../../../../build/contracts/ProfileCore.json';

@Component({
  selector: 'app-search-top',
  templateUrl: './search-top.component.html',
  styleUrls: ['./search-top.component.scss']
})
export class SearchTopComponent implements OnInit, OnDestroy {
  @select(['search', 'profile']) readonly profile$: Observable<any>;

  profileForm: FormGroup;
  profileSub: Subscription;
  profile: ProfileModel;

  /**
   * Creates an instance of SearchTopComponent.
   * @param {NgRedux<IProfileState>} ngRedux
   * @param {ProfileActions} actions
   * @memberof SearchTopComponent
   */
  constructor(
    public fb: FormBuilder,
    private ngRedux: NgRedux<ISearchState>,
    private actions: SearchActions,
    private route: ActivatedRoute,
  ) {
    const address = this.route.snapshot.queryParams['address'];

    this.profileForm = fb.group({
      address: [address, Validators.required],
    });
  }

  /**
   *
   *
   * @memberof SearchTopComponent
   */
  ngOnInit(): void {
    const address = this.route.snapshot.queryParams['address'];
    // const networkId = this.route.snapshot.queryParams['networkId'];
    if (address) {
      this.ngRedux.dispatch(this.actions.searchProfile(address));
    }

    this.profileSub = this.profile$.subscribe((profile: ProfileModel) => {
      this.profile = profile;
    });
  }

  /**
   *
   *
   * @memberof SearchTopComponent
   */
  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }

  /**
   *
   *
   * @memberof SearchTopComponent
   */
  search() {
    if (this.profileForm.dirty && this.profileForm.valid) {
      this.ngRedux.dispatch(this.actions.searchProfile(this.profileForm.value.address));
    }
  }

}
