import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from './../../Services/_payment-service/payment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../Services/index';
import { AccountCustomerService, TitleBoxInf } from './../index';
import { Component, OnInit } from '@angular/core';
import { AuthenticationResponse, User } from 'src/app/_models';
import { UserService } from 'src/app/Services/_user-service/user.service';
import { tap } from 'rxjs/operators';
import { Order } from 'src/app/_models/order';
export interface RecentOrderElement {
  order: Order
  action: [string, string]
}
@Component({
  templateUrl: './edit-contact-dialog.component.html',
  styleUrls: ['./account.component.scss'],
})
export class UpdateContactDiagLog {
  contactFormGroup!: FormGroup;
  contactFormSetup!: [label: string, formControlName: string][];
  user!: User;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private thisRef: MatDialogRef<UpdateContactDiagLog>,
    fb: FormBuilder
  ) {
    this.authService.authResponse$.subscribe((auth) => {
      this.user = auth!.user;
      this.contactFormSetup = [
        ['Họ tên', 'fullName'],
        ['Email', 'email'],
        ['Số điện thoại', 'phoneNumber'],
      ];
      this.contactFormGroup = fb.group({
        /* FormController */
        fullName: this.user!.fullName,
        email: this.user!.email,
        phoneNumber: this.user!.phoneNumber,
      });
    });
  }
  updateContact() {
    console.log(this.contactFormGroup.value)
    const { fullName, email, phoneNumber } = this.contactFormGroup.value;
    let user = {
      ...this.user,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
    };
    this.userService
      .updateUser(user)
      .pipe(
        tap((user) => {
          let auth = this.authService.getAuthResponseBSubVal();
          auth!.user = user;
          this.authService.authResponseBSub.next(auth);
        })
      )
      .subscribe();
  }
}


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  titleBoxInf: TitleBoxInf = {
    title: 'TÀI KHOẢN',
    titleBoxImage: 'account-title-box.jpg',
  };
  contactView!: [string, any][];
  deliveryAddress!: string;
  orderDisplayedColumns: string[] = [
    'id',
    'createdDate',
    'orderBy',
    'totalPayment',
    'status',
    'action',
  ];
  recentOrdersDataSource!: RecentOrderElement[];
  constructor(
    private accountCustomerService: AccountCustomerService,
    private authService: AuthService,
    private paymentService: PaymentService,
    fb: FormBuilder,
    private dialog: MatDialog,
    private cookieService: CookieService
  ) {
    this.authService.authResponse$.subscribe((response) => {
      let user = response?.user;
      this.contactView = [
        ['Họ tên', user?.fullName],
        ['Email', user?.email],
        ['Số điện thoại (+84)', user?.phoneNumber],
      ];
      this.deliveryAddress = user!.address;
    });



    const userId = this.cookieService.get('uid')
    this.paymentService
      .getRecentOrdersByUserId(userId)
      .subscribe((orders) => {
        this.recentOrdersDataSource = []
        orders.forEach((order) => {
            let orderElement: RecentOrderElement = {
              order: {
                ...order,
                createdDate: new Date(order.createdDate).toDateString()
              },
              action: ['Xem', 'Đặt lại'],
            };
            this.recentOrdersDataSource.push(orderElement)
          });
      });
  }
  ngOnInit(): void {
    this.accountCustomerService.titleBoxInfBSub.next(this.titleBoxInf);
  }
  updateContact() {
    let updateContactDialogRef = this.dialog.open(UpdateContactDiagLog, {
      width: '400px',
    });
  }
}
