import { createAction, ActionType, props } from '@ngrx/store';
import { User } from '../../models/user/user.model';
/* Login */

export const CHECK_USER_INF = "[CHECK] User Info"
export const checkUserInfoAC = createAction(CHECK_USER_INF, props<{user: User | null, mess: string}>())
export const LOGOUT = '[LOGOUT]';
export const logoutAC = createAction(LOGOUT);
export type LoginActions =
  | ActionType<typeof checkUserInfoAC>
  | ActionType<typeof logoutAC>
