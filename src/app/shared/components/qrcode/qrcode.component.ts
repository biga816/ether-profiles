import { Injectable, Inject, Component, ElementRef, Input } from '@angular/core';

// libs
import * as qrcode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  template: `
    <canvas></canvas>
  `,
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {
  @Input() set account(account: string) {
    this.setQrcode(account);
  }

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
  public setQrcode(account: string) {
    const nativeElement = this.elementRef.nativeElement;

    qrcode.toCanvas(nativeElement.children[0], `ethereum:${account}`, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

}
