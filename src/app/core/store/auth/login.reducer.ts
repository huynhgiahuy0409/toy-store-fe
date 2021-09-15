import { LoginState } from './login.state';
import * as loginActions from './login.action'
import { ActivatedRouteSnapshot } from '@angular/router';
const initialState: LoginState = {
    user: null,
    mess: '',
}

export function loginReducer(state: LoginState = initialState, action: loginActions.LoginActions): LoginState{
    switch (action.type) {
      case loginActions.CHECK_USER_INF:
        return { ...state, user: action.user, mess: action.mess};
      case loginActions.LOGOUT:
        return { ...state, user: null, mess: '' };
      default:
        return state;
    }
}
