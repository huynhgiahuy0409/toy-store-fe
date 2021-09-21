import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Pagination, Product, PaginationResult, PendingOrderItem } from 'src/app/_models';
import { concatMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addProductIntoOrder } from 'src/app/core/store/pending-order-items/index';
import { ProductService } from 'src/app/Services';
import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import { FavoriteProductService } from 'src/app/Services/_favorite-product-service/favorite-product.service';
interface Order {
  value: [string,string];
  viewValue: string;
}

@Component({
  templateUrl: './addition-dialog.component.html'
})
export class AdditionDialog{
  constructor(private additionDialogRef: MatDialogRef<AdditionDialog>, @Inject(MAT_DIALOG_DATA) public data: string ){
    setTimeout(() => {
      additionDialogRef.close();
    }, 1500);
  }
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  page!: string | undefined;
  pagination$!: Observable<Pagination>;
  pagingResult$!: Observable<PaginationResult<Product> | null>;
  orders: Order[] = [
    { value: ['price', 'asc'], viewValue: 'Sắp xếp theo giá tăng dần' },
    { value: ['price', 'desc'], viewValue: 'Sắp xếp theo giá giảm dần' },
    { value: ['name', 'asc'], viewValue: 'Sắp xếp theo tên A-Z' },
    { value: ['name', 'desc'], viewValue: 'Sắp xếp theo tên Z-A' },
  ];
  selected = 'option2';
  constructor(
    private productService: ProductService,
    private favProductService: FavoriteProductService,
    private cookieService: CookieService,
    private cartService: ShoppingCartService,
    private store: Store,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productService.filter$
      .pipe(
        concatMap((filter) => {
          const {ageRangeIds , useObjectId,brandId,priceRange, orderBy: order} = filter
          console.log(filter)
          return this.productService.showProducts(
            ageRangeIds,
            useObjectId,
            brandId,
            priceRange,
            order,
            this.page
          );
        }),
        tap((products) => {
          this.productService.pagingResultBSub.next(products);
          this.pagingResult$ = this.productService.pagingResult$;
          this.pagination$ = this.productService.pagination$;
        })
      )
      .subscribe();
  }
  handlePageChange(event$: any) {
    console.log(event$)
    let pageIndex = event$.pageIndex;
    let pageSize = event$.pageSize;
    this.productService.filter$
      .pipe(
        concatMap((filter) => {
          return this.productService.showProducts(
            filter.ageRangeIds,
            filter.useObjectId,
            filter.brandId,
            filter.priceRange,
            filter.orderBy,
            this.page,
            pageIndex,
            pageSize
          );
        }),
        tap((products) => {
          this.productService.pagingResultBSub.next(products);
        })
      )
      .subscribe();
  }
  orderByChange($event: any) {
    console.log($event)
    let filter = this.productService.filterBSub.value;
    filter.orderBy = $event.value;
    this.productService.filterBSub.next(filter);
  }
  addToCart(product: Product) {
    this.productService.addToCart(product)
  }
  addToWishList(productId: number) {
    this.productService.addToWishList(productId)
  }
}
