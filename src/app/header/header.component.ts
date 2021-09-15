import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../Services/_auth-service/auth.service';
import { pendingOrdersSelection } from '../core/store/pending-order-items';
import { PendingOrderItem } from '../_models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged: boolean = false;
  fullName: string | null = null;
  pendingOrderLength!: number;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
  this.store
    .select(pendingOrdersSelection)
    .pipe(
      tap((pendingOrderItems) => {
        this.pendingOrderLength = pendingOrderItems.length;
      })
    )
    .subscribe();

  this.authService.authResponse$.subscribe((response) => {
    if (response != null) {
      this.fullName = response.user.fullName;
      this.logged = true;
    }
  });
  }

  logout() {
    this.authService.logout();
    this.authService.deleteCookieAuth()
    this.logged = false;
    this.fullName = null;
  }
  public clickSearch() {
    /* this.onClickSearch.emit(this.searchValue); */
  }
}
