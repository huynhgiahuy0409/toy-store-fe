import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from 'src/app/Services/_payment-service/payment.service';
import { Order } from 'src/app/_models/order';
import { AccountCustomerService, TitleBoxInf } from '../index';
import { tap } from 'rxjs/operators';
export interface OrderElement {
  order: Order;
  action: string;
}
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss'],
})
export class PurchaseHistoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'createdDate',
    'orderBy',
    'totalPayment',
    'status',
    'action',
  ];
  orderDataSource!: MatTableDataSource<OrderElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  titleBoxInf: TitleBoxInf = {
    title: 'LỊCH SỬ MUA HÀNG',
    titleBoxImage: 'account-title-box.jpg',
  };
  constructor(
    private accountCustomerService: AccountCustomerService,
    private paymentService: PaymentService,
    private cookieService: CookieService
    ) {}
    ngOnInit(): void {
      this.accountCustomerService.titleBoxInfBSub.next(this.titleBoxInf);
  }
  ngAfterViewInit(): void {
    const userId = this.cookieService.get('uid');
    this.paymentService
      .getRecentOrdersByUserId(userId)
      .pipe(
        tap((orders) => {
          let orderElementList: OrderElement[] = [];
          orders.forEach((order) => {
            const orderElement: OrderElement = {
              order: {
                ...order,
                createdDate: new Date(order.createdDate).toDateString()
              },
              action: 'Xem chi tiết',
            };
            orderElementList.push(orderElement);
          });
          console.log(this.paginator)
          this.orderDataSource = new MatTableDataSource(orderElementList);
          this.orderDataSource.paginator = this.paginator;
          this.orderDataSource.sort = this.sort;
        })
      )
      .subscribe();
  }
}
