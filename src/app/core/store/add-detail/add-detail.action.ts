import { ActionType, createAction } from "@ngrx/store";

export const ADD_PRODUCT_INTO_DETAIL = "[ADD] Product into detail"
export const addProductIntoDetail = createAction(ADD_PRODUCT_INTO_DETAIL);

export type DetailActions = ActionType<typeof addProductIntoDetail>;
