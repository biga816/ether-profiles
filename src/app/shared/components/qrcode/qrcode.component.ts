import { Injectable, Inject, Component, ElementRef, Input, AfterViewInit } from '@angular/core';

// libs
import * as qrcode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  template: `
    <canvas></canvas>
  `,
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements AfterViewInit {
  @Input() public account: any;

  /**
   * Creates an instance of QrcodeComponent.
   * @param {ElementRef} elementRef
   * @memberof QrcodeComponent
   */
  constructor( @Inject(ElementRef) private elementRef: ElementRef) {
  }

  /**
   *
   *
   * @memberof QrcodeComponent
   */
  public ngAfterViewInit() {
    const nativeElement = this.elementRef.nativeElement;

    qrcode.toCanvas(nativeElement.children[0], `ethereum:${this.account}`, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

}
