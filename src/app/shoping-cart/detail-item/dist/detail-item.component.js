"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailItemComponent = void 0;
var core_1 = require("@angular/core");
var DetailItemComponent = /** @class */ (function () {
    function DetailItemComponent() {
        this.pendingOrder = null;
    }
    DetailItemComponent.prototype.ngOnInit = function () {
        if (this.pendingOrder !== null) {
            var _a = this.pendingOrder, priceUnit = _a.priceUnit, discountPercent = _a.discountPercent, quantity = _a.quantity;
            this.totalPrice = Math.round((discountPercent * priceUnit * quantity) / 100 / 1000) * 1000;
        }
    };
    __decorate([
        core_1.Input()
    ], DetailItemComponent.prototype, "pendingOrder");
    DetailItemComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-item',
            templateUrl: './detail-item.component.html',
            styleUrls: [
                '../template/css/style.css',
                '../template/css/custom.css',
                '../template/css/responsive.css',
                '../template/css/bootstrap.min.css',
            ]
        })
    ], DetailItemComponent);
    return DetailItemComponent;
}());
exports.DetailItemComponent = DetailItemComponent;
