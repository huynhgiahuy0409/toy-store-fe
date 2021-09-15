import { Observable } from 'rxjs';
import { AccountCustomerService } from './index';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TitleBoxInf } from './index';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-account-customer',
  templateUrl: './account-customer.component.html',
  styleUrls: ['./account-customer.component.scss'],
})
export class AccountCustomerComponent implements OnInit {
  titleBoxInf: TitleBoxInf = {
    title: '',
    titleBoxImage: '',
  };
  yourAccountList: [string, string][] = [
    ['Tài khoản', 'account'],
    ['Lịch sử mua hàng', 'purchase-history'],
    ['Danh sách yêu thích', 'favorites'],
    ['Địa chỉ giao hàng', 'delivery-address/update'],
  ];
  constructor(private accountCustomerService: AccountCustomerService) {}
  ngOnInit(): void {
    this.accountCustomerService.titleBoxInf$.pipe(delay(0)).subscribe((titleBoxInf) => {
        this.titleBoxInf = titleBoxInf;
    });

  }
}
