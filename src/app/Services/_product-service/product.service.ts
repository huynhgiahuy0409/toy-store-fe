import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  Pagination,
  PaginationResult,
  PendingOrderItem,
  Product,
  ProductFilter,
} from 'src/app/_models';
import { delay, tap } from 'rxjs/operators';
import { param } from 'jquery';
import { FavoriteProductService } from '../_favorite-product-service/favorite-product.service';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AdditionDialog } from 'src/app/product/product-list/product-list.component';
import { addProductIntoOrder } from 'src/app/core/store/pending-order-items';
import { DOMAIN } from 'src/app/_models/constant';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  initialFilter: ProductFilter = {
    ageRangeIds: null,
    useObjectId: null,
    brandId: null,
    priceRange: null,
    orderBy: null,
  };
  initialPagination: Pagination = {
    totalLength: 0,
    pageItems: 6,
    pageIndex: 0,
  };
  pagingBSub = new BehaviorSubject<Pagination>(this.initialPagination);
  pagination$ = this.pagingBSub.asObservable();
  pagingResultBSub = new BehaviorSubject<PaginationResult<Product> | null>(
    null
  );
  pagingResult$ = this.pagingResultBSub.asObservable();
  filterBSub = new BehaviorSubject<ProductFilter>(this.initialFilter);
  filter$: Observable<ProductFilter> = this.filterBSub.pipe();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(
    private httpClient: HttpClient,
    private favProductService: FavoriteProductService,
    private cookieService: CookieService,
    private cartService: ShoppingCartService,
    private store: Store,
    private dialog: MatDialog
  ) {}
  /* HELPER */
  showProducts(
    ageRangeIds: number[] | null,
    userObjectId: number | null,
    brandId: number | null,
    priceRange: [number, number] | null,
    order: [string, string] | null,
    page?: string,
    pageIndex: number = this.initialPagination.pageIndex,
    limit: number = this.initialPagination.pageItems
  ): Observable<PaginationResult<Product>> {
    const url = `${DOMAIN}/api/product-page`;
    let httpParamOptions: HttpParamsOptions = {
      fromObject: {
        pageIndex: pageIndex,
        pageSize: limit,
      },
    };
    /* If input has a value then create param */
    ageRangeIds ? (httpParamOptions.fromObject!.ageIds = ageRangeIds) : null;
    userObjectId
      ? (httpParamOptions.fromObject!.genderId = userObjectId)
      : null;
    brandId ? (httpParamOptions.fromObject!.brandId = brandId) : null;
    priceRange ? (httpParamOptions.fromObject!.priceRange = priceRange) : null;
    order ? (httpParamOptions.fromObject!.order = order) : null;
    page ? (httpParamOptions.fromObject!.page = page) : null;
    let params = new HttpParams(httpParamOptions);
    this.httpOptions.params = params;
    return this.httpClient
      .get<PaginationResult<Product>>(url, this.httpOptions)
      .pipe(
        tap((products) => {
          this.pagingBSub.next({
            totalLength: products.totalLength,
            pageIndex: pageIndex,
            pageItems: this.initialPagination.pageItems,
          });
        })
      );
  }
  searchProductsByName(
    searchValue: string,
    page: number = this.initialPagination.pageIndex,
    limit: number = this.initialPagination.pageItems
  ): Observable<PaginationResult<Product>> {
    let url = `${DOMAIN}/api/product-page/search`;
    let httpParamOptions = {
      fromObject: {
        searchValue: searchValue,
        pageIndex: page,
        pageSize: limit,
      },
    };
    let params = new HttpParams(httpParamOptions);
    this.httpOptions.params = params;
    return this.httpClient
      .get<PaginationResult<Product>>(url, this.httpOptions)
      .pipe(
        tap((products) => {
          this.pagingResultBSub.next(products);
          this.pagingBSub.next({
            totalLength: products.totalLength,
            pageIndex: page,
            pageItems: limit,
          });
        })
      );
  }
  findOne(productId: number): Observable<Product> {
    const url = `${DOMAIN}/api/product-detail`;
    const httpParamOptions = {
      fromObject: {
        productId: productId,
      },
    };
    this.httpOptions.params = new HttpParams(httpParamOptions);
    return this.httpClient.get<Product>(url, this.httpOptions);
  }

  addToWishList(productId: number) {
    const userId = this.cookieService.get('uid');
    if (userId) {
      this.favProductService
        .addToWishlist(Number.parseInt(userId), productId)
        .subscribe((fp) => {
          if (fp) {
            this.dialog.open(AdditionDialog, {
              width: '430px',
              data: 'WISHLIST',
            });
          } else {
            this.dialog.open(AdditionDialog, {
              width: '450px',
              data: 'ALREADY_EXIST_IN_WISHLIST',
            });
          }
        });
    } else {
      this.dialog.open(AdditionDialog, {
        width: '500',
        data: 'NOT_LOGGED_IN',
      });
    }
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
      foundPendingOrder.quantity++;
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
}
