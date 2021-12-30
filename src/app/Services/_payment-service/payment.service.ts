import { OrderItem } from './../../_models/product';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from 'src/app/_models/order';
import { DOMAIN } from 'src/app/_models/constant';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  createOrder(order: OrderRequest): Observable<OrderRequest> {
    let url = `${DOMAIN}/api/order`;
    return this.httpClient.post<OrderRequest>(url, order, this.httpOptions);
  }
  getRecentOrdersByUserId(userId: string): Observable<Order[]> {
    let url = `${DOMAIN}/api/order?userId=${userId}&limit=5`;
    return this.httpClient.get<Order[]>(url, this.httpOptions);
  }
}
