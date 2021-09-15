"use strict";
exports.__esModule = true;
exports.pendingDetailSelection = exports.feature_addDetail = void 0;
var store_1 = require("@ngrx/store");
var store_2 = require("@ngrx/store");
exports.feature_addDetail = store_1.createFeatureSelector("feature_addDetail");
exports.pendingDetailSelection = store_2.createSelector(exports.feature_addDetail, function (state) { return state.addDetail; });
