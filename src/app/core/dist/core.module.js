"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var effects_1 = require("@ngrx/effects");
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
var login_reducer_1 = require("./store/auth/login.reducer");
var login_effect_1 = require("./store/auth/login.effect");
var orders_reducers_1 = require("./store/orders/orders.reducers");
var coupon_reducer_1 = require("./store/coupon/coupon.reducer");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                store_1.StoreModule.forFeature('feature_login', login_reducer_1.loginReducer),
                store_1.StoreModule.forFeature('feature_orders', orders_reducers_1.ordersReducer),
                store_1.StoreModule.forFeature('feature_coupon', coupon_reducer_1.couponReducer),
                effects_1.EffectsModule.forFeature([login_effect_1.LoginEffects]),
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
