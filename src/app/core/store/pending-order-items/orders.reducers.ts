import { CartState, SummaryCart } from "./orders.state";
import * as ordersActions from './orders.actions'
import { PendingOrderItem } from "src/app/_models";
/* Cơ chế: Khi addToCart() được gọi. Update local storage -> update state (init = những gì có trong storage) */

/* getPendingOrders từ local storage */
function getPendingOrderItems(): PendingOrderItem[]{
  if(localStorage['pendingOrders']){
    return JSON.parse(localStorage['pendingOrders'] || '[]');
  }else {
    localStorage['pendingOrders'] = JSON.stringify([])
    return [];
  }
}
const initialSummaryCart: SummaryCart = {
  subTotal: 0,
  totalPayment: 0,
  couponValue: 0
}
function getSummaryCart(): SummaryCart{
  if(localStorage['summaryCart']){
    return JSON.parse(localStorage['summaryCart'])
  }else {
    localStorage['summaryCart'] = JSON.stringify(initialSummaryCart)
    return initialSummaryCart
  }
}
export const initialState: CartState = {
  pendingOrders: getPendingOrderItems(),
  summaryCart: getSummaryCart()
};


export function ordersReducer(state = initialState, action: ordersActions.OrdersActions): CartState{
  console.log("OK12345")
  switch (action.type) {
    /* khi action dispatch. Vẫn lấy trong localStorage */
    case ordersActions.RESET_ORDER:
      return {
        pendingOrders: getPendingOrderItems(),
        summaryCart: getSummaryCart(),
      };
    case ordersActions.ADD_PRODUCT:
      return {
        pendingOrders: getPendingOrderItems(),
        summaryCart: getSummaryCart(),
      };
    case ordersActions.UPDATE_QUANTITY:
      return {
        pendingOrders: getPendingOrderItems(),
        summaryCart: getSummaryCart(),
      };
    case ordersActions.REMOVE_ORDER:
      return {
        pendingOrders: getPendingOrderItems(),
        summaryCart: getSummaryCart(),
      };
    case ordersActions.UPDATE_SUMMARY_CART:
      return {
        ...state,
        summaryCart: getSummaryCart(),
      };
    case ordersActions.UPDATE_PENDING_ORDER_ITEMS:
      return {
        ...state,
        pendingOrders: getPendingOrderItems(),
    };
    case ordersActions.UPDATE_CART:
      return {
        pendingOrders: getPendingOrderItems(),
        summaryCart: getSummaryCart(),
      };
    default:
      return state;
  }
};
