import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { updateCart, updatePendingOrderItems } from '../../core/store/pending-order-items/orders.actions';
import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import {
  AuthenticationResponse,
  AuthenticationRequest,
  PendingOrderItem,
} from '../../_models/index';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { resetOrder as resetCart } from 'src/app/core/store/pending-order-items/orders.actions';
import { AccessDeniedComponent } from 'src/app/login/login.component';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  isAdmin: boolean = false;
  public authResponseBSub: BehaviorSubject<AuthenticationResponse | null>;
  public authResponse$: Observable<AuthenticationResponse | null>;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private store: Store,
    private router: Router,
    private httpClient: HttpClient,
    private shoppingCartService: ShoppingCartService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    let authReponse = {};
    this.authResponseBSub = new BehaviorSubject<AuthenticationResponse | null>(
      null
    );
    this.authResponse$ = this.authResponseBSub.asObservable();
  }
  ngOnInit(): void {}
  /* GETTER */
  getAuthResponseBSubVal(): AuthenticationResponse {
    return this.authResponseBSub.value!;
  }
  hasToken(): boolean {
    return this.cookieService.check('a-t');
  }
  /* CALL API */
  public createAuthenticationToken(
    authenticationRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    const url = `https://toy-store-be.herokuapp.com/api/authenticate`;
    return this.httpClient
      .post<AuthenticationResponse>(
        url,
        authenticationRequest,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          this.authResponseBSub.next(response);
          this.startRefreshTokenTimer();
          /* login is completed */
          if (response.jwt) {
            /* merge cart when login */
            if (localStorage['pendingOrders']) {
              let pendingOrderItems: PendingOrderItem[] = JSON.parse(
                localStorage['pendingOrders']
              );
              if (pendingOrderItems.length != 0) {
                this.shoppingCartService
                  .mergeCart(pendingOrderItems)
                  ?.pipe(
                    tap((pendingOrderItems) => {
                      localStorage['pendingOrders'] =
                        JSON.stringify(pendingOrderItems);
                      this.store.dispatch(updatePendingOrderItems());
                    })
                  )
                  .subscribe();
              }
            }
            /* set auth cookie */
            if (
              this.cookieService.check('a-t') &&
              this.cookieService.check('e-t') &&
              this.cookieService.check('uid')
            ) {
              this.setCookieAuth(response);
            }
          }
          return response;
        })
      );
  }
  logout() {
    if (this.cookieService.check('a-t')) {
      this.httpClient
        .post<any>(`https://toy-store-be.herokuapp.com/api/revoke-token`, this.httpOptions)
        .subscribe();
      localStorage.removeItem('pendingOrders');
      localStorage.removeItem('summaryCart');
      this.store.dispatch(resetCart());
      this.stopRefreshTokenTimer();
      this.authResponseBSub.next(null);
    }
  }
  /* HELPER METHOD */

  private refreshTokenTimeout!: any;
  private startRefreshTokenTimer() {
    if (this.getAuthResponseBSubVal()) {
      this.setCookieAuth(this.getAuthResponseBSubVal())
      const jwt = this.getAuthResponseBSubVal().jwt;
      const expiredTime = jwt.tokenExpirationDate;
      const timeOut = expiredTime.valueOf() - Date.now() - 2000;
      console.log(timeOut)
      this.refreshTokenTimeout = setTimeout(() => {
        console.log("TIME OUT")
        /* giải quyết trường hợp cookie bị xoá hoặc bị hết hạn */
        if(this.cookieService.check('a-t')){
          this.refreshToken().subscribe();
        }else {
          /* Popup hết phiên làm việc */
          this.notifyEndOfSession()
        }
      }, timeOut);
    }
  }
  notifyEndOfSession(){
    localStorage.removeItem('pendingOrders');
    localStorage.removeItem('summaryCart');
    localStorage.removeItem('__visited');
    this.store.dispatch(updateCart());
    this.router.navigate(['/home'])
    this.dialog.open(AccessDeniedComponent, {
      data: 'endOfSession',
    });
  }

  setCookieAuth(authResponse: AuthenticationResponse) {
    localStorage.setItem('__visited', JSON.stringify(true))
    this.cookieService.set('a-t', authResponse.jwt.token, new Date(authResponse.jwt.tokenExpirationDate));
    this.cookieService.set('uid', authResponse.user.id, new Date(authResponse.jwt.tokenExpirationDate));
  }
  deleteCookieAuth() {
    localStorage.removeItem('__visited')
    this.cookieService.delete('a-t');
    this.cookieService.delete('uid');
  }
  refreshToken(): Observable<AuthenticationResponse> {
    console.log("Refreshed Token")
    return this.httpClient
      .post<AuthenticationResponse>(`https://toy-store-be.herokuapp.com/api/refresh-token`, this.httpOptions)
      .pipe(
        tap((response) => {
          this.authResponseBSub.next(response);
          this.startRefreshTokenTimer();
          return response;
        })
      );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return of(error);
  }
}
