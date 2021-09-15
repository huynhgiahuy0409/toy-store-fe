"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var my_server_http_service_service_1 = require("./my-server-http-service.service");
describe('MyServerHttpServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(my_server_http_service_service_1.MyServerHttpService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
