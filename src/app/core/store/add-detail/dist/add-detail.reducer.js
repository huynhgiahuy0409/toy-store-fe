"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.ordersReducer = exports.initialState = void 0;
var detailActions = require("./add-detail.action");
/* Cơ chế: Khi addToCart() được gọi. Update local storage -> update state (init = những gì có trong storage) */
/* getPendingOrders từ local storage */
function getDetail() {
    if (localStorage.getItem('detail') == null) {
        return [];
    }
    else {
        return JSON.parse(localStorage.getItem('detail') || '');
    }
}
exports.initialState = {
    addDetail: getDetail()
};
function ordersReducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        /* khi action dispatch. Vẫn lấy trong localStorage */
        case detailActions.ADD_PRODUCT_INTO_DETAIL:
            return __assign(__assign({}, state), { addDetail: getDetail() });
        // case detailActions.UPDATE_QUANTITY:
        //   return { ...state, pendingOrders: getPendingOrders() };
        // case detailActions.REMOVE_ORDER:
        //   return { ...state, pendingOrders: getPendingOrders() };
        default:
            return state;
    }
}
exports.ordersReducer = ordersReducer;
;
