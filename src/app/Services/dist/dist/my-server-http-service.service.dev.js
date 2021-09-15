"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.MyServerHttpService = void 0;

var operators_1 = require("rxjs/operators");

var http_1 = require("@angular/common/http");

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var MyServerHttpService =
/** @class */
function () {
  function MyServerHttpService(httpClient) {
    this.httpClient = httpClient;
    this.httpOptions = {
      headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.REST_API_SERVER = 'http://localhost:3000';
  }

  MyServerHttpService.prototype.getAll = function (serverPath) {
    var url = this.REST_API_SERVER + "/" + serverPath;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getById = function (serverPath, id) {
    var url = this.REST_API_SERVER + "/" + serverPath + "?id=" + id;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.searchByName = function (serverPath, searchValue) {
    var url = this.REST_API_SERVER + "/" + serverPath + "?name_like=" + searchValue;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getCouponByCode = function (code) {
    var url = this.REST_API_SERVER + "/coupon?code=" + code;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getByIds = function (serverPath, ids) {
    var url = this.REST_API_SERVER + "/" + serverPath + "?";
    ids.forEach(function (id) {
      url = url + ("id=" + id + "&");
    });
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.checkUsername = function (username) {
    var url = this.REST_API_SERVER + "/users?username=" + username;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.checkUserInfo = function (username, password) {
    var url = this.REST_API_SERVER + "/users?username=" + username + "&password=" + password;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getSaleProductsList = function (indexPage, limit) {
    var url = this.REST_API_SERVER + "/saleProducts?_page=" + indexPage + "&_limit=" + limit;
    console.log(this.httpOptions);
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getItem = function (serverPath, paramArray) {
    var url = this.REST_API_SERVER + "/" + serverPath + "?";
    paramArray.forEach(function (value, key) {
      if (key === 'id') {
        url = url + ("id=" + value + "&");
      } else if (key === 'page') {
        url = url + ("_page=" + value + "&");
      } else if (key === 'limit') {
        url = url + ("_limit=" + value + "&");
      } else if (key === 'sort' && value != '') {
        url = url + ("_sort=" + value + "&");
      } else if (key === 'order' && value != '') {
        url = url + ("_order=" + value + "&");
      } else if (key === 'checkAgeValue') {
        var valueArray = value;

        if (valueArray.length != 0) {
          valueArray.forEach(function (element) {
            var stringValue = element.value;
            url = url + ("age.value_like=" + stringValue + "&");
          });
        }
      } else if (key === 'checkSex') {
        url = url + ("sex_like=" + value + "&");
      } else if (key === 'checkBrand') {
        url = url + ("brand_like=" + value + "&");
      } else if (key === 'search') {
        url = url + ("name_like=" + value + "&");
      }
    });
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getAllSaleProducts = function () {
    var url = this.REST_API_SERVER + "/saleProducts";
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getCart = function () {
    var url = this.REST_API_SERVER + "/cart";
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.addToCart = function (item) {
    var url = this.REST_API_SERVER + "/cart";
    return this.httpClient.put(url, item, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getPageItems = function (page, limit) {
    var url = this.REST_API_SERVER + "/saleProducts?_page=" + page + "&_limit=" + limit;
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.getAllBrands = function () {
    var url = this.REST_API_SERVER + "/brands";
    return this.httpClient.get(url, this.httpOptions).pipe(operators_1.catchError(this.handleError));
  };

  MyServerHttpService.prototype.handleError = function (error) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
    } // Return an observable with a user-facing error message.


    return rxjs_1.throwError('Something bad happened; please try again later.');
  };

  MyServerHttpService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], MyServerHttpService);
  return MyServerHttpService;
}();

exports.MyServerHttpService = MyServerHttpService;