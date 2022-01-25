import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { AppBootstrapModule } from './app-bootstrap.module';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MemberCardListComponent } from './member-card/member-card-list/member-card-list.component';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './core/store/auth/login.effect';
import { ShoppingCartComponent } from './shoping-cart/shopping-cart.component';
import {
  CouponAuditDiaLog,
  SummaryBoxComponent,
} from './shoping-cart/summary-box/summary-box.component';
import { TitleBoxComponent } from './tittle-box/title-box.component';
import {
  AddressEditDialogComponent,
  CardPaymentDialog,
  PaymentComponent,
  PaymentSuccessDialog,
} from './payment/payment.component';
import { AccessDeniedComponent, LoginComponent } from './login/login.component';
import { appInitializer } from './_helper/app.initializer';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { ErrorInterceptor } from './_helper/error.interceptor';
import { AuthService } from './Services/_auth-service/auth.service';
import {
  MaterialModule,
  PaginatorComponent,
} from './paginator/paginator.component';
import { ProductComponent } from './product/product.component';
import {
  AdditionDialog,
  ProductListComponent,
} from './product/product-list/product-list.component';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentLoginDialog } from './shoping-cart/summary-box/summary-box.component';
import { AccountCustomerComponent } from './account-customer/account-customer.component';
import {
  AccountComponent,
  UpdateContactDiagLog,
} from './account-customer/account/account.component';
import { PurchaseHistoryComponent } from './account-customer/purchase-history/purchase-history.component';
import { FavoritesComponent } from './account-customer/favorites/favorites.component';
import { DeliveryAddressComponent } from './account-customer/delivery-address/delivery-address.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MemberCardComponent,
    MemberCardListComponent,
    ShoppingCartComponent,
    SummaryBoxComponent,
    TitleBoxComponent,
    PaymentComponent,
    LoginComponent,
    PaginatorComponent,
    ProductComponent,
    ProductListComponent,
    ProductFilterComponent,
    AccountCustomerComponent,
    AccountComponent,
    PurchaseHistoryComponent,
    FavoritesComponent,
    DeliveryAddressComponent,
    AddressEditDialogComponent,
    AccessDeniedComponent,
    PaymentLoginDialog,
    CardPaymentDialog,
    AdditionDialog,
    PaymentSuccessDialog,
    UpdateContactDiagLog,
    CouponAuditDiaLog,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppBootstrapModule,
    TooltipModule,
    ModalModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([LoginEffects]),
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    RouterModule,
    MatProgressSpinnerModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService,
    AuthService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatSpinner],
})
export class AppModule {}
