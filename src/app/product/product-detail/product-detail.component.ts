import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services';
import { PendingOrderItem, Product } from 'src/app/_models';
import { Observable } from 'rxjs';
import { addProductIntoOrder } from 'src/app/core/store/pending-order-items';
import { ShoppingCartService } from 'src/app/Services/_shopping-cart/shopping-cart.service';
import { AdditionDialog } from '../product-list/product-list.component';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: ShoppingCartService,
    private dialog: MatDialog,
    private store: Store
  ) {
    console.log(activatedRoute)
    const productId = activatedRoute.snapshot.url[1].path;
    this.product$ = this.productService.findOne(Number.parseInt(productId))
  }
  ngOnInit(): void {}
  buyNow(product: Product, value: string) {
    this.addToCart(product,value)
    this.router.navigate(['/shopping-cart']);
  }
  addToCart(product: Product, value: string) {
    /* PENDING ORDER ITEMS */
    let pendingOrders: PendingOrderItem[] = JSON.parse(
      localStorage['pendingOrders'] || '[]'
    );
    console.log(pendingOrders)
    let foundPendingOrder: PendingOrderItem | undefined = pendingOrders.find(
      (pendingOrderItem) => {
        return pendingOrderItem.product.id === product.id;
      }
    );
    /* foundPendingOrder is same reference to pendingOrders */
    if (foundPendingOrder) {
      foundPendingOrder.quantity += Number.parseInt(value)
    } else {
      foundPendingOrder = {
        product: product,
        quantity: Number.parseInt(value)
      };
      pendingOrders.push(foundPendingOrder);
    }
    const { priceToBuy } = foundPendingOrder.product;
    const { quantity } = foundPendingOrder;
    foundPendingOrder.totalPrice = priceToBuy * quantity;
    localStorage['pendingOrders'] = JSON.stringify(pendingOrders);
    /* change state */
    /* NGRX STORE */
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
