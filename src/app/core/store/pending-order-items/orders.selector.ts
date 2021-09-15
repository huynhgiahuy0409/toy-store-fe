import { CartState } from './orders.state';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector} from '@ngrx/store';
export const feature_cart = createFeatureSelector<CartState>(
  'feature_shoppingCart'
);
export const pendingOrdersSelection = createSelector(
  feature_cart,
  (state) => state.pendingOrders
);
export const summaryCartSelection = createSelector(
  feature_cart,
  (state) => state.summaryCart
);
export const couponSelection = createSelector(
  summaryCartSelection,
  (state) => state.couponValue
);
