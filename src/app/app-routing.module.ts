import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCardComponent } from './member-card/member-card.component';
import { ShoppingCartComponent } from './shoping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helper/auth.guard';
import { ProductComponent } from './product/product.component';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import { AccountComponent, DeliveryAddressComponent, FavoritesComponent, PurchaseHistoryComponent } from './account-customer/index';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'products/sale', component: ProductComponent },
  { path: 'products/new', component: ProductComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'member-cart', component: MemberCardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/payment', component: LoginComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  {
    path: 'customer',
    component: AccountCustomerComponent,
    children: [
      { path: '', component: AccountComponent },
      { path: 'account', component: AccountComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'delivery-address', component: DeliveryAddressComponent },
      { path: 'delivery-address/update', component: DeliveryAddressComponent },
      { path: 'delivery-address/new', component: DeliveryAddressComponent },
      { path: 'favorites', component: FavoritesComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
