"use strict";
exports.__esModule = true;
exports.messSelection = exports.userSelection = exports.feature_auth = void 0;
var store_1 = require("@ngrx/store");
exports.feature_auth = store_1.createFeatureSelector('feature_login');
//(Selector, projector)
/*-*/
exports.userSelection = store_1.createSelector(exports.feature_auth, function (state) { return state.user; });
/* -- */
/* - */
exports.messSelection = store_1.createSelector(exports.feature_auth, function (state) { return state.mess; });
