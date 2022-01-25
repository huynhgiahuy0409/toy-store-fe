import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _overlayConfigure: OverlayConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
  };
  private _spinnerTopRef!: OverlayRef;
  spin$: Subject<boolean> = new Subject();
  constructor(private overlay: Overlay) {
    this._spinnerTopRef = this.cdkOverlayCreate();
    this.spin$
      .asObservable()
      .pipe(
        tap((val) => {
          if (val) {
            console.log(val);
            this.showSpinner();
          } else {
            console.log(val);
            this._spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
          }
        })
      )
      .subscribe();
  }
  private cdkOverlayCreate(): OverlayRef {
    return this.overlay.create(this._overlayConfigure);
  }
  private showSpinner(): void {
    if (!this._spinnerTopRef.hasAttached()) {
      console.log('attach');
      this._spinnerTopRef.attach(new ComponentPortal(MatSpinner));
    }
  }
  private stopSpinner() {
    this._spinnerTopRef.detach();
  }
}
