import { DetailProduct } from "../../models/common-models/detail-product";
import { AddDetail } from "./add-detail.state";
import * as detailActions from './add-detail.action'
/* Cơ chế: Khi addToCart() được gọi. Update local storage -> update state (init = những gì có trong storage) */

/* getPendingOrders từ local storage */

function getDetail(): DetailProduct[]{
  if(localStorage.getItem('detail') == null){
    return [];
  }else {
    return JSON.parse(localStorage.getItem('detail') || '');
  }
}
export const initialState: AddDetail = {
  addDetail: getDetail(),

};


export function ordersReducer(state = initialState, action: detailActions.DetailActions): AddDetail{
  switch (action.type) {
    /* khi action dispatch. Vẫn lấy trong localStorage */
    case detailActions.ADD_PRODUCT_INTO_DETAIL:
      return { ...state, addDetail: getDetail() };
    // case detailActions.UPDATE_QUANTITY:
    //   return { ...state, pendingOrders: getPendingOrders() };
    // case detailActions.REMOVE_ORDER:
    //   return { ...state, pendingOrders: getPendingOrders() };
    default:
      return state;
  }
};
