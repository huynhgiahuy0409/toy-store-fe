"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SummaryBoxComponent = void 0;
var orders_selector_1 = require("./../../core/store/orders/orders.selector");
var core_1 = require("@angular/core");
var login_selector_1 = require("src/app/core/store/auth/login.selector");
var SummaryBoxComponent = /** @class */ (function () {
    function SummaryBoxComponent(httpService, store, router) {
        this.httpService = httpService;
        this.store = store;
        this.router = router;
        /* Refactor
        @Input()
        orders: PendingOrderItem[] | null = []; */
        this.orders = [];
        this.couponInput = '';
        this.summaryCart = {
            subTotal: 0,
            tax: 0,
            grandTotal: 0,
            coupon: {
                id: '',
                code: '',
                value: 0
            }
        };
    }
    SummaryBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* Refactor */
        this.store.select(orders_selector_1.pendingOrdersSelection).subscribe(function (orders) {
            _this.orders = orders;
            _this.getSummaryCart(_this.orders);
        });
    };
    SummaryBoxComponent.prototype.getSummaryCart = function (orders) {
        var _this = this;
        this.summaryCart.subTotal = 0;
        orders === null || orders === void 0 ? void 0 : orders.forEach(function (order) {
            var priceUnit = order.priceUnit, discountPercent = order.discountPercent, quantity = order.quantity;
            _this.summaryCart.subTotal +=
                Math.round(((100 - discountPercent) * priceUnit * quantity) / 100 / 1000) *
                    1000;
        });
        this.getTax(this.summaryCart.subTotal);
        this.getGrandTotal();
    };
    SummaryBoxComponent.prototype.getTax = function (subTotal) {
        if (subTotal > 2000000) {
            this.summaryCart.tax = 50000;
        }
    };
    SummaryBoxComponent.prototype.getGrandTotal = function () {
        this.summaryCart.grandTotal =
            this.summaryCart.subTotal +
                this.summaryCart.tax -
                this.getCouponInSubTotal(this.summaryCart.subTotal);
    };
    SummaryBoxComponent.prototype.getCouponInSubTotal = function (subTotal) {
        return (subTotal * this.summaryCart.coupon.value) / 100;
    };
    SummaryBoxComponent.prototype.applyCoupon = function () {
        this.checkCoupon(this.couponInput);
    };
    SummaryBoxComponent.prototype.checkCoupon = function (couponCode) {
        var _this = this;
        this.httpService.getCouponByCode(couponCode).subscribe(function (data) {
            if (data.length === 1) {
                _this.summaryCart.coupon = data[0];
                _this.getGrandTotal();
            }
        });
    };
    SummaryBoxComponent.prototype.goPayment = function () {
        var _this = this;
        this.store.select(login_selector_1.userSelection).subscribe(function (user) {
            if (user !== null) {
                _this.router.navigate(['/payment']);
            }
            else {
                _this.router.navigate(['/login']);
            }
        }).unsubscribe();
    };
    SummaryBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-summary-box',
            templateUrl: './summary-box.component.html',
            styleUrls: [
                '../template/css/style.css',
                '../template/css/custom.css',
                '../template/css/responsive.css',
                '../template/css/bootstrap.min.css',
            ]
        })
    ], SummaryBoxComponent);
    return SummaryBoxComponent;
}());
exports.SummaryBoxComponent = SummaryBoxComponent;
