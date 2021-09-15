import { updateCart } from './../core/store/pending-order-items/orders.actions';
import { PaymentService } from './../Services/_payment-service/payment.service';
import { Store } from '@ngrx/store';
import { Observable, timer, combineLatest } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { pendingOrdersSelection, summaryCartSelection } from '../core/store/pending-order-items/orders.selector';
import { Router } from '@angular/router';
import { AuthenticationResponse, PendingOrderItem, User } from '../_models';
import { AuthService } from '../Services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../Services/_user-service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, take, tap } from 'rxjs/operators';
import { OrderRequest } from '../_models/order';
import { ShoppingCartService } from '../Services/_shopping-cart/shopping-cart.service';
import { SummaryCart } from '../core/store/pending-order-items/orders.state';
@Component({
  templateUrl: 'payment-success-dialog.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentSuccessDialog{
  isSuccess: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean){
    this.isSuccess = data
  }
}

@Component({
  selector: 'card-payment-diaglog',
  templateUrl: './card-payment-dialog.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class CardPaymentDialog implements OnInit {
  counter$!: Observable<number>;
  countdown: number = 60;
  cardPaymentForm!: FormGroup;
  paymentSuccess: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cardPaymentDialogRef: MatDialogRef<CardPaymentDialog>,
    private router: Router
  ) {
    this.cardPaymentForm = fb.group({
      cardHolderName: '',
      cardNumber: '',
      password: '',
      expiredDate: '',
    });
    this.counter$ = timer(0, 1000).pipe(
      take(this.countdown),
      map(() => --this.countdown)
    );
  }
  ngOnInit(): void {}
  paymentConfirmation() {
    if (
      this.cardPaymentForm.value['cardHolderName'] === 'HUYNH GIA HUY' &&
      this.cardPaymentForm.value['password'] === '123'
    ) {
      this.paymentSuccess = true;
    }
    if (this.paymentSuccess) {
      let paymentSuccessDialogRef = this.dialog.open(PaymentSuccessDialog, {
        data: true,
      });
      setTimeout(() => {
        paymentSuccessDialogRef.close();
        this.cardPaymentDialogRef.close({
          event: 'PAYMENT_SUCCESS',
          data: this.cardPaymentForm,
        });
      }, 500);
      setTimeout(() => {
        this.router.navigate(['/products'])
      }, 600);
    } else {
      let cardPaymentDialogRef = this.dialog.open(PaymentSuccessDialog, {
        data: false,
      });
      setTimeout(() => {
        cardPaymentDialogRef.close();
      }, 2000);
    }
  }
}
@Component({
  selector: 'address-edit-dialog',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class AddressEditDialogComponent implements OnInit {
  saveAddrIsChecked!: boolean;
  editingUserForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    authService.authResponse$.subscribe((authRes) => {
      this.editingUserForm = this.formBuilder.group(authRes!.user);
    });
  }
  ngOnInit(): void {}
  savePendingAddress($event: any) {
    this.saveAddrIsChecked = $event.checked;
  }
  onSubmit(){
    const authValue: AuthenticationResponse | null = this.authService.getAuthResponseBSubVal();
    if(this.saveAddrIsChecked){
      this.userService.updateUser(this.editingUserForm.value).pipe(tap(user => {
        authValue!.user = user
        this.authService.authResponseBSub.next(authValue);
      })).subscribe()
    }else {
      authValue!.user = this.editingUserForm.value
      this.authService.authResponseBSub.next(authValue);
    }
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  title: string = 'THANH TOÁN';
  backgroundImage: string = 'payment-bg-title.jpg';
  paymentMethods: [string, number, boolean][] = [
    ['Thanh toán trực tiếp khi nhận hàng', 0, true],
    ['Thanh toán bằng Visa/Master Card', 1, false],
  ];
  sltPaymentMethod: number = 0;
  pendingOrderItems!: PendingOrderItem[];
  summaryCart!: SummaryCart;
  user!: User;
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private paymentService: PaymentService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    /*  Khi người dùng click thanh toán, redirec -> payment. Nên sẽ kiểm tra đã login chưa. */
    combineLatest([
      this.store.select(pendingOrdersSelection),
      this.store.select(summaryCartSelection),
    ]).subscribe(([pendingOrderItems,summaryCart])=>{
      this.pendingOrderItems = pendingOrderItems
      this.summaryCart = summaryCart
    });
    this.authService.authResponse$.subscribe((authRes) => {
      this.user = authRes!.user;
    });
  }
  /* Address method */
  openAddressEditDialog() {
    this.dialog.open(AddressEditDialogComponent);
  }
  /* Common method */
  payment() {
    if (this.sltPaymentMethod === 1) {
      let cardPaymentDlgRef = this.dialog.open(CardPaymentDialog);
      cardPaymentDlgRef.afterClosed().subscribe(result => {
        if(result.event === "PAYMENT_SUCCESS"){
          let orderRequest: OrderRequest = {
            userId: this.user.id,
            creditCard: result.data['value'],
            totalPayment: this.summaryCart.totalPayment
          };
          this.paymentService.createOrder(orderRequest).subscribe();
          localStorage.removeItem('pendingOrders')
          localStorage.removeItem('summaryCart')
          this.store.dispatch(updateCart())
        }
      })
    }else if(this.sltPaymentMethod === 0) {
      this.dialog.open(PaymentSuccessDialog, { data: true });
      let orderRequest: OrderRequest = {
        userId: this.user.id,
        creditCard: null,
        totalPayment: this.summaryCart.totalPayment
      };
      this.paymentService.createOrder(orderRequest).subscribe();
      localStorage.removeItem('pendingOrders')
      localStorage.removeItem('summaryCart')
      this.store.dispatch(updateCart())
    }

  }
  deletePendingOrder(pendingOrderItem: PendingOrderItem) {
    let pendingOrders: PendingOrderItem[] = JSON.parse(
      localStorage.getItem('pendingOrders')!
    );
    let summaryCart: SummaryCart = JSON.parse(localStorage['summaryCart'])
    const {subTotal, couponValue } = summaryCart
    summaryCart.subTotal -= pendingOrderItem.totalPrice!
    summaryCart.totalPayment = subTotal - (subTotal * couponValue) / 100;
    pendingOrders = pendingOrders.filter((pendingOrder) => {
      return pendingOrder.product.id != pendingOrderItem.product.id;
    });
    localStorage['pendingOrders'] = JSON.stringify(pendingOrders)
    localStorage['summaryCart'] = JSON.stringify(summaryCart)
    this.store.dispatch(updateCart());
    this.shoppingCartService.updateCart('remove',pendingOrderItem)?.subscribe();
  }
}

