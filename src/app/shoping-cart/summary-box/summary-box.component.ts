import { CookieService } from 'ngx-cookie-service';
import { updateCart } from './../../core/store/pending-order-items/orders.actions';
import { updateSummaryCart } from '../../core/store/pending-order-items/orders.actions';
import { Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingOrderItem } from 'src/app/_models';
import {
  pendingOrdersSelection,
} from 'src/app/core/store/pending-order-items';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import { SummaryCart } from 'src/app/core/store/pending-order-items/orders.state';
@Component({
  selector: 'payment-login-dialog',
  templateUrl: './payment-login-dialog.component.html',
})
export class PaymentLoginDialog {
  constructor(private router: Router){
  }
  login(){
    this.router.navigate(['/login/payment'])
  }
}
@Component({
  selector: 'payment-login-dialog',
  templateUrl: './coupon-audit-dialog.component.html',
})
export class CouponAuditDiaLog {
  isSuccess!: string;
  constructor(private matDialogRef: MatDialogRef<CouponAuditDiaLog>, @Inject(MAT_DIALOG_DATA) public data: string){
    if(data === 'SUCCESS'){
      this.isSuccess = "SUCCESS"
    }else if(data === 'FAIL'){
      this.isSuccess = 'FAIL';
    }else {
      this.isSuccess = 'APPLIED';
    }
    setTimeout(() => {
      matDialogRef.close()
    }, 1000);
  }
}
@Component({
  selector: 'app-summary-box',
  templateUrl: './summary-box.component.html',
  styleUrls: [
    '../template/css/style.css',
    '../template/css/custom.css',
    '../template/css/responsive.css',
    '../template/css/bootstrap.min.css',
  ],
})
export class SummaryBoxComponent implements OnInit {
  pendingOrders: PendingOrderItem[] | null = [];
  couponInput: string = '';
  summaryCart!: SummaryCart;
  constructor(
    private store: Store,
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private cookieService: CookieService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.store.select(pendingOrdersSelection).subscribe(pendingOrderItems => {
      let summaryCart: SummaryCart = JSON.parse(localStorage['summaryCart'])
      let subTotal = 0;
      pendingOrderItems.forEach(pendingOrderItem => {
        subTotal += pendingOrderItem.totalPrice!;
      })
      summaryCart.subTotal = subTotal
      summaryCart.totalPayment  = subTotal - subTotal*(summaryCart.couponValue / 100)
      this.summaryCart = summaryCart
      localStorage['summaryCart'] = JSON.stringify(summaryCart)
      this.store.dispatch(updateSummaryCart())
    })
  }
  applyCoupon() {
    this.checkCoupon(this.couponInput);
  }
  checkCoupon(couponCode: string) {
      this.shoppingCartService.getCoupon(couponCode).subscribe((coupon) => {
        let summaryCart: SummaryCart = JSON.parse(localStorage['summaryCart']);
        if(coupon){
          if(summaryCart.couponValue == 0){
            this.dialog.open(CouponAuditDiaLog, {
              width: '420px',
              data: "SUCCESS"
            })
          }else {
            this.dialog.open(CouponAuditDiaLog, {
              width: '420px',
              data: "APPLIED"
            })
          }
          summaryCart.couponValue = coupon.discount;
          localStorage['summaryCart'] = JSON.stringify(summaryCart);
          this.store.dispatch(updateCart());
        }else {
          this.dialog.open(CouponAuditDiaLog, {
            width: '420px',
            data: "FAIL"
          })
        }
      });
  }
  goPayment(){
    if(this.cookieService.check('a-t')) {
      this.router.navigate(['/payment'])
    }else {
      this.dialog.open(PaymentLoginDialog)
    }
  }
}
