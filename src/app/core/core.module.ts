import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from "@angular/core";
import { loginReducer } from './store/auth/login.reducer';
import { LoginEffects } from './store/auth/login.effect';
import { ordersReducer } from './store/pending-order-items/orders.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_login', loginReducer),
    StoreModule.forFeature('feature_shoppingCart', ordersReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class CoreModule {}
