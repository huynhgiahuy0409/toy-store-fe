import { updateCart } from './../core/store/pending-order-items/orders.actions';
import { Store } from '@ngrx/store';
import { AuthService } from '../Services/index';
export function appInitializer(authenticationService: AuthService, store: Store) {
  return () => {
    if (authenticationService.hasToken()) {
      console.log('Refresh token called');
      return new Promise((resolve) => {
        authenticationService.refreshToken().subscribe().add(resolve);
      });
    } else {
      const isVisited = localStorage['__visited'];
      if (isVisited) {
        authenticationService.notifyEndOfSession();
      }
      return;
    }
  }
};
