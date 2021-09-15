import { UserService } from './../../Services/_user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountCustomerService, TitleBoxInf } from '../index';
import { AuthService } from 'src/app/Services';
import { User } from 'src/app/_models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: [
    './delivery-address.component.scss',
    '../account-customer.component.scss',
  ],
})
export class DeliveryAddressComponent implements OnInit {
  path!: string;
  titleBoxInf: TitleBoxInf = {
    title: 'ĐỊA CHỈ GIAO HÀNG',
    titleBoxImage: 'account-title-box.jpg',
  };
  deliveryAddressForm!: FormGroup;
  user!: User;
  constructor(
    private accountCustomerService: AccountCustomerService,
    private authService: AuthService,
    private userService: UserService,
    fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
      authService.authResponse$.subscribe((auth) => {
        this.user = auth!.user;
        this.deliveryAddressForm = fb.group({
          fullName: this.user.fullName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
          address: this.user.address,
        });
      });
  }
  updateContact() {
    const { fullName, email, phoneNumber, address } =
      this.deliveryAddressForm.value;
    let user = {
      ...this.user,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
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
  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot);
    this.accountCustomerService.titleBoxInfBSub.next(this.titleBoxInf);
  }
}
