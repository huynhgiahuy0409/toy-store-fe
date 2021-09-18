import { AuthService } from '../Services/_auth-service/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);
        if (
          [401, 403].includes(err.status) &&
          this.authenticationService.getAuthResponseBSubVal()
        ) {
          console.log(err);
        }
        if ([500].includes(err.status)) {
          console.log(err);
        }
        throw err;
      })
    );
  }

}
