import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private cookieService: CookieService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('a-t')
    if (token) {
     /*  This condition will processing when have a request if has a token in LS. Request setted in header with Key:"Authorization" and value has prefix Bearer */
      console.log(token);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      console.log(cloned['headers'])
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
