"use strict";
exports.__esModule = true;
exports.logoutAC = exports.LOGOUT = exports.checkUserInfoAC = exports.CHECK_USER_INF = void 0;
var store_1 = require("@ngrx/store");
/* Login */
exports.CHECK_USER_INF = "[CHECK] User Info";
exports.checkUserInfoAC = store_1.createAction(exports.CHECK_USER_INF, store_1.props());
exports.LOGOUT = '[LOGOUT]';
exports.logoutAC = store_1.createAction(exports.LOGOUT);
