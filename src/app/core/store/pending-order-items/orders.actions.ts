import { ActionType, createAction, props } from "@ngrx/store";


export const RESET_ORDER = "[RESET] Order"
export const resetOrder = createAction(RESET_ORDER)
export const ADD_PRODUCT = "[ADD] Product"
export const addProduct = createAction(ADD_PRODUCT);
export const UPDATE_QUANTITY = '[Update] Quantity';
export const updateQuantity = createAction(UPDATE_QUANTITY);
export const REMOVE_ORDER = '[REMOVE] order';
export const removeOrder = createAction(REMOVE_ORDER);
export const UPDATE_SUMMARY_CART = '[Update] Summary Cart'
export const updateSummaryCart = createAction(UPDATE_SUMMARY_CART)
export const UPDATE_PENDING_ORDER_ITEMS = '[Update] Pending Order Items'
export const updatePendingOrderItems = createAction(UPDATE_PENDING_ORDER_ITEMS)
export const UPDATE_COUPON_VALUE = '[Update] Coupon'
export const updateCouponValue = createAction(UPDATE_COUPON_VALUE, props<{couponValue: number}>())
export const UPDATE_CART = '[Update] CART'
export const updateCart = createAction(UPDATE_CART)
export type OrdersActions =
  | ActionType<typeof addProduct>
  | ActionType<typeof updateQuantity>
  | ActionType<typeof updateCouponValue>
  | ActionType<typeof removeOrder>
  | ActionType<typeof resetOrder>
  | ActionType<typeof updateSummaryCart>
  | ActionType<typeof updatePendingOrderItems>
  | ActionType<typeof updateCart>;
