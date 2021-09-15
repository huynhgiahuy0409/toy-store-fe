import { CookieService } from 'ngx-cookie-service';
import { removeOrder, updatePendingOrderItems } from '../core/store/pending-order-items/orders.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from "@angular/core";
import { pendingOrdersSelection } from '../core/store/pending-order-items/orders.selector';
import { PendingOrderItem } from '../_models';
import { updateQuantity } from '../core/store/pending-order-items/index';
import { ShoppingCartService } from '../Services/_shopping-cart/shopping-cart.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: [
    './template/css/style.css',
    './template/css/custom.css',
    './template/css/responsive.css',
    './template/css/bootstrap.min.css',
  ],
})
export class ShoppingCartComponent implements OnInit {
  title: string = 'GIỎ HÀNG';
  backgroundImage: string = "cart-bg-title.jpeg";
  pendingOrders$!: Observable<PendingOrderItem[]>;
  constructor(private store: Store,private shoppingCartService: ShoppingCartService, private cookieService:CookieService) {}
  ngOnInit(): void {
    if(this.cookieService.check('a-t')){
      const uid = Number.parseInt(this.cookieService.get('uid'))
      console.log(uid)
      this.shoppingCartService.getShoppingCart(uid).pipe(tap(pendingOrderItems => {
        console.log(pendingOrderItems)
        pendingOrderItems.forEach(pendingOrderItem => {
          pendingOrderItem.totalPrice = pendingOrderItem.product.priceToBuy * pendingOrderItem.quantity
        })
        localStorage['pendingOrders'] = JSON.stringify(pendingOrderItems);
        this.store.dispatch(updatePendingOrderItems())
      })).subscribe();
    }
    this.pendingOrders$ = this.store.select(pendingOrdersSelection)
  }
  changeQuantity(pendingOrderItem: PendingOrderItem, value: string){
    /* Lấy danh sách pendingOrders từ LS */
    let pendingOrders = JSON.parse(
      localStorage.getItem('pendingOrders') || ''
    ) as PendingOrderItem[];
    /* Tìm ra sản phẩm có id được thay đổi quantity trong danh sách trên */
    const foundOrder = pendingOrders.find((order) => order.product.id === pendingOrderItem.product.id);
    /* Đổi số lượng, và cập nhật tổng giá của sản phẩm trong order */
    if (foundOrder) {
      foundOrder.quantity = Number.parseInt(value);
      foundOrder.totalPrice = this.shoppingCartService.computeTotalPrice(foundOrder)
    }
    /* Lưu lại vào LS */
    this.shoppingCartService.updateCart('add', foundOrder!)?.subscribe();
    localStorage['pendingOrders'] =  JSON.stringify(pendingOrders);
    this.store.dispatch(updateQuantity())
  }
  removePendingOrder(id: number){
    let pendingOrders = JSON.parse(
      localStorage.getItem('pendingOrders') || ''
    ) as PendingOrderItem[];
    /* lọc ra sản phẩm có Id được xoá */
    const foundOrder = pendingOrders.find((order) => order.product.id === id);
    pendingOrders = pendingOrders.filter((item) => item.product.id !== id);
    this.shoppingCartService.updateCart('remove', foundOrder!)?.subscribe();
    localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
    this.store.dispatch(removeOrder());
  }
}
