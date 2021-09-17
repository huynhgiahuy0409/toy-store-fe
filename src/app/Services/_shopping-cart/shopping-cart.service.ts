import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SummaryCart } from 'src/app/core/store/pending-order-items/orders.state';
import { Coupon, PendingOrderItem } from 'src/app/_models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  initialSummaryCart: SummaryCart = {
    subTotal : 0,
    couponValue: 0,
    totalPayment: 0
  }
  summaryCartBSub: BehaviorSubject<SummaryCart> = new BehaviorSubject(this.initialSummaryCart)
  summaryCart$ = this.summaryCartBSub.asObservable()
  get summaryCartBSubVal(){
    return this.summaryCartBSub.value
  }
  updateCart(
    action: 'add' | 'remove',
    pendingOrderItem: PendingOrderItem
  ): Observable<any> | null {
    const userId = this.cookieService.get('uid');
    if (userId) {
      const url = `https://toy-store-be.herokuapp.com/api/cart/update?userId=${userId}&action=${action}`;
      return this.httpClient.post<any>(url, pendingOrderItem, this.httpOptions);
    }
    return null;
  }
  mergeCart(pendingOrderItems: PendingOrderItem[]):Observable<PendingOrderItem[]> | null{
    const userId = this.cookieService.get('uid');
    if (userId) {
      const url = `/api/cart/merge?userId=${userId}`;
      return this.httpClient.post<PendingOrderItem[]>(
        url,
        pendingOrderItems,
        this.httpOptions
      );
    }
    return null;
  }
  getShoppingCart(userId: number): Observable<PendingOrderItem[]>{
    const url = `https://toy-store-be.herokuapp.com/api/cart?userId=${userId}`;
    return this.httpClient.get<PendingOrderItem[]>(url, this.httpOptions);
  }
  computeTotalPrice(pendingOrderItem: PendingOrderItem){
    console.log
  const totalPrice =
    (pendingOrderItem['quantity'] *
      pendingOrderItem.product['priceUnit'] *
      (100 - pendingOrderItem.product['discountPercent'])) /
      100 || 0;
    return totalPrice
  }
  getCoupon(code: string): Observable<Coupon>{
    let url = `https://toy-store-be.herokuapp.com/api/coupon?code=${code}`;
    return this.httpClient.get<Coupon>(url, this.httpOptions);
  }
}
