import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./login.state";

export const feature_auth = createFeatureSelector<LoginState>('feature_login');
                                               //(Selector, projector)
/*-*/
export const userSelection = createSelector(feature_auth, (state) => state.user);
/* -- */
/* - */
export const messSelection = createSelector(feature_auth, state => state.mess)

