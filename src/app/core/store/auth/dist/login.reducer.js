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
exports.loginReducer = void 0;
var loginActions = require("./login.action");
var initialState = {
    user: null,
    mess: ''
};
function loginReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case loginActions.CHECK_USER_INF:
            return __assign(__assign({}, state), { user: action.user, mess: action.mess });
        case loginActions.LOGOUT:
            return __assign(__assign({}, state), { user: null, mess: '' });
        default:
            return state;
    }
}
exports.loginReducer = loginReducer;
