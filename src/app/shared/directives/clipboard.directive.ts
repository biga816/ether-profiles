import { OnInit, OnDestroy, Directive, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import Clipboard from 'clipboard';

@Directive({
  selector: '[appClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
  clipboard: Clipboard;
  elt: ElementRef;

  // @Input('appClipboard')
  // elt: ElementRef;
  @Input() set appClipboard(targetElt: ElementRef) {
    this.elt = targetElt;
  }

  @Output()
  clipboardSuccess: EventEmitter<any> = new EventEmitter();

  @Output()
  clipboardError: EventEmitter<any> = new EventEmitter();

  constructor(private eltRef: ElementRef) {
  }

  ngOnInit() {
    this.clipboard = new Clipboard(this.eltRef.nativeElement, {
      target: () => {
        return this.elt;
      }
    });

    this.clipboard.on('success', (e) => {
      this.clipboardSuccess.emit();
    });

    this.clipboard.on('error', (e) => {
      this.clipboardError.emit();
    });
  }

  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
