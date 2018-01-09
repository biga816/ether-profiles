import { Injectable, Inject, Component, ElementRef, Input } from '@angular/core';

import { ProfileModel } from './../../models/profile.model';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() public profile: ProfileModel;

  /**
   * Creates an instance of QrcodeComponent.
   * @param {ElementRef} elementRef
   * @memberof QrcodeComponent
   */
  constructor( @Inject(ElementRef) private elementRef: ElementRef) {
  }

}
