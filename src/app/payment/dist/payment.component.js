"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentComponent = void 0;
var login_selector_1 = require("src/app/core/store/auth/login.selector");
var core_1 = require("@angular/core");
var orders_selector_1 = require("../core/store/orders/orders.selector");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(store, router) {
        this.store = store;
        this.router = router;
        this.title = 'THANH TOÁN';
        this.backgroundImage = 'payment-bg-title.jpg';
    }
    PaymentComponent.prototype.ngOnInit = function () {
        /*  Khi người dùng click thanh toán, redirec -> payment. Nên sẽ kiểm tra đã login chưa. */
        this.checkLogin();
        this.orders$ = this.store.select(orders_selector_1.pendingOrdersSelection);
    };
    PaymentComponent.prototype.checkLogin = function () {
        var _this = this;
        this.store.select(login_selector_1.userSelection).subscribe(function (user) {
            if (user !== null) {
                _this.router.navigate(['/payment']);
            }
        }).unsubscribe;
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styleUrls: ['./payment.component.scss']
        })
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
