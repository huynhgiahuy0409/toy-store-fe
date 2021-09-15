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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShoppingCartComponent = void 0;
var orders_actions_1 = require("./../core/store/orders/orders.actions");
var core_1 = require("@angular/core");
var orders_selector_1 = require("../core/store/orders/orders.selector");
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent(store) {
        this.store = store;
        this.title = 'GIỎ HÀNG';
        this.backgroundImage = "cart-bg-title.jpeg";
    }
    ShoppingCartComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* this.orders$ = this.store.select(pendingOrdersSelection); */
        /* Lấy pendingOrders từ state (initital state này lấy từ storage)*/
        /* Tính lại totalPrice khi có sự thay đổi quantity */
        this.store.select(orders_selector_1.pendingOrdersSelection).subscribe(function (orders) {
            _this.updateTotalPrice(orders);
        });
        /* end */
    };
    ShoppingCartComponent.prototype.updateTotalPrice = function (orders) {
        this.pendingOrders = orders.map(function (item) { return (__assign(__assign({}, item), { totalPrice: Math.round(((100 - item.discountPercent) * item.priceUnit * item.quantity) / 100 / 1000) * 1000 })); });
    };
    ShoppingCartComponent.prototype.changeQuantity = function (pendingOrderItem, value) {
        var pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '');
        var foundOrder = pendingOrders.find(function (order) { return order.id === pendingOrderItem.id; });
        if (foundOrder) {
            foundOrder.quantity = Number.parseInt(value);
            console.log(pendingOrders);
        }
        localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
        this.store.dispatch(orders_actions_1.addProductIntoOrder());
    };
    ShoppingCartComponent.prototype.removePendingOrder = function (id) {
        var pendingOrders = JSON.parse(localStorage.getItem('pendingOrders') || '');
        /* lọc ra sản phẩm có Id được xoá */
        pendingOrders = pendingOrders.filter(function (item) { return item.id !== id; });
        console.log(pendingOrders);
        localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
        this.store.dispatch(orders_actions_1.removeOrder());
    };
    ShoppingCartComponent = __decorate([
        core_1.Component({
            selector: 'app-shopping-cart',
            templateUrl: './shopping-cart.component.html',
            styleUrls: [
                './template/css/style.css',
                './template/css/custom.css',
                './template/css/responsive.css',
                './template/css/bootstrap.min.css',
            ]
        })
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
