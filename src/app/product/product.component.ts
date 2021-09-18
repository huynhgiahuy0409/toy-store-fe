import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services';
import { FavoriteProductService } from '../Services/_favorite-product-service/favorite-product.service';
import { MatDialog } from '@angular/material/dialog';
import { AdditionDialog } from './product-list/product-list.component';
import { PendingOrderItem, Product } from '../_models';
import { addProductIntoOrder } from '../core/store/pending-order-items';
import { ShoppingCartService } from '../Services/_shopping-cart/shopping-cart.service';

interface DefaultSltOption {
  [key: string]: boolean;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  title!: string;
  backgroundImage: string = 'saleProduct-bg-title.jpg';
  page: string | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private favProductService: FavoriteProductService,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private cartService: ShoppingCartService,
    private store: Store,
  ) {
    activatedRoute.snapshot.url.forEach((urlSegment) => {
      if (urlSegment['path'] == 'sale') {
        this.page = 'sale';
        this.title = 'SẢN PHẨM KHUYẾN MÃI';
      } else if (urlSegment['path'] == 'new') {
        this.page = 'new';
        this.title = 'SẢN PHẨM MỚI';
      } else {
        this.page = undefined;
        this.title = 'TẤT CẢ SẢN PHẨM';
      }
    });
  }
  ngOnInit(): void {}
}
