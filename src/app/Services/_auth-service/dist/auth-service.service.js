"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthServiceService = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var login_selector_1 = require("src/app/core/store/auth/login.selector");
var operators_1 = require("rxjs/operators");
var AuthServiceService = /** @class */ (function () {
    function AuthServiceService(store, httpClient) {
        var _this = this;
        this.httpClient = httpClient;
        this.isAdmin = false;
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        this.user$ = store.select(login_selector_1.userSelection);
        this.user$.subscribe(function (data) {
            _this.isAdmin = !!(data === null || data === void 0 ? void 0 : data.role.find(function (item) { return item.code === 'ADMIN'; }));
        });
    }
    AuthServiceService.prototype.createAuthenticationToken = function (authenticationRequest) {
        var url = "/authenticate";
        return this.httpClient
            .post(url, authenticationRequest, this.httpOptions)
            .pipe(operators_1.catchError(this.handleError));
    };
    AuthServiceService.prototype.handleError = function (error) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // Return an observable with a user-facing error message.
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    AuthServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthServiceService);
    return AuthServiceService;
}());
exports.AuthServiceService = AuthServiceService;
