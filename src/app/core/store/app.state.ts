import { LoginState } from './auth/login.state';
import { CartState } from './pending-order-items/orders.state';
export interface AppState {
  feature_login: LoginState;
  feature_shoppingCart: CartState;
}
export interface Action{
  type: string
}
 