"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var orders_selector_1 = require("./../core/store/orders/orders.selector");
var core_1 = require("@angular/core");
var login_action_1 = require("../core/store/auth/login.action");
var login_selector_1 = require("../core/store/auth/login.selector");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(store, router) {
        this.store = store;
        this.router = router;
        this.searchValue = '';
        this.onClickSearch = new core_1.EventEmitter();
        /* @Output()
        onClickLogout = new EventEmitter(); */
        this.totalProduct = 0;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(login_selector_1.userSelection).subscribe(function (user) {
            _this.user = user;
        });
        this.store.select(orders_selector_1.pendingOrdersSelection).subscribe(function (orders) {
            _this.totalProduct = orders.length;
        });
    };
    HeaderComponent.prototype.clickLogout = function () {
        localStorage.removeItem('userId');
        this.store.dispatch(login_action_1.logoutAC());
        this.user = null;
        this.router.navigate(['/home']);
    };
    HeaderComponent.prototype.clickSearch = function () {
        this.onClickSearch.emit(this.searchValue);
    };
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "user");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "onClickSearch");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
