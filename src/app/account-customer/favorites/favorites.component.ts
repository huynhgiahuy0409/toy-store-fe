import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  FavoriteProduct,
  PendingOrderItem,
  Product,
} from 'src/app/_models/product';
import { AccountCustomerService, TitleBoxInf } from '../index';
import { FavoriteProductService } from 'src/app/Services/_favorite-product-service/favorite-product.service';
import { tap } from 'rxjs/operators';
import { addProductIntoOrder } from 'src/app/core/store/pending-order-items';
import { AdditionDialog } from 'src/app/product/product-list/product-list.component';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: [
    './favorites.component.scss',
    '../../product/product.component.scss',
  ],
})
export class FavoritesComponent implements OnInit {
  favoriteProducts!: FavoriteProduct[];
  titleBoxInf: TitleBoxInf = {
    title: 'DANH SÁCH YÊU THÍCH',
    titleBoxImage: 'account-title-box.jpg',
  };
  initPagination = {
    pageSizeOptions: [1, 3, 6, 9],
    pageIndex: 0,
    pageSize: 6,
    totalLength: 0,
  };
  constructor(
    private accountCustomerService: AccountCustomerService,
    private favProductService: FavoriteProductService,
    private cookieService: CookieService,
    private store:Store,
    private dialog: MatDialog,
    private cartService: ShoppingCartService
  ) {}
  ngOnInit(): void {
    this.accountCustomerService.titleBoxInfBSub.next(this.titleBoxInf);
    const userId = this.cookieService.get('uid');
    this.favProductService
      .findAll(
        "view",
        Number.parseInt(userId),
        this.initPagination.pageIndex,
        this.initPagination.pageSize
      )
      .pipe(
        tap((pagingResult) => {
          console.log(pagingResult.items);
          this.favoriteProducts = pagingResult.items;
          this.initPagination.totalLength = pagingResult.totalLength;
        })
      )
      .subscribe();
  }
  handleChangePage($event: any) {
    const userId = this.cookieService.get('uid');
    const pageIndex = $event.pageIndex;
    const pageSize = $event.pageSize;
    this.favProductService
      .findAll('view', Number.parseInt(userId), pageIndex, pageSize)
      .pipe(
        tap((pagingResult) => {
          this.favoriteProducts = pagingResult.items;
          this.initPagination.totalLength = pagingResult.totalLength;
        })
      )
      .subscribe();
      this.initPagination.pageSize = pageSize
      this.initPagination.pageIndex = pageIndex
  }
  addToCart(product: Product) {
    /* PENDING ORDER ITEMS */
    let pendingOrders: PendingOrderItem[] = JSON.parse(
      localStorage['pendingOrders'] || '[]'
    );
    let foundPendingOrder: PendingOrderItem | undefined = pendingOrders.find(
      (pendingOrderItem) => {
        return pendingOrderItem.product.id === product.id;
      }
    );
    /* foundPendingOrder is same reference to pendingOrders */
    if (foundPendingOrder) {
      foundPendingOrder.quantity += 1;
    } else {
      foundPendingOrder = {
        product: product,
        quantity: 1,
      };
      pendingOrders.push(foundPendingOrder);
    }
    const { priceToBuy } = foundPendingOrder.product;
    const { quantity } = foundPendingOrder;
    foundPendingOrder.totalPrice = priceToBuy * quantity;
    localStorage['pendingOrders'] = JSON.stringify(pendingOrders);
    /* change state */
    this.store.dispatch(addProductIntoOrder());
    /* add pendingOrderItem to server */
    this.cartService.updateCart('add', foundPendingOrder)?.subscribe();

    /* show a dialog to notify */
    this.dialog.open(AdditionDialog, {
      width: '450px',
      data: 'CART',
    });
  }
  removeFavoriteProduct(favProductId: number){
    const userId = this.cookieService.get('uid');
    this.favProductService.findAll(
      'remove',
      Number.parseInt(userId),
      this.initPagination.pageIndex,
      this.initPagination.pageSize,
      favProductId
    ).pipe(tap(favProductsPagingResult => {
      console.log(favProductsPagingResult.items)
      this.favoriteProducts = favProductsPagingResult.items
      this.initPagination.totalLength = favProductsPagingResult.totalLength
    })).subscribe();
  }
}
