import { AuthService} from './../Services';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const behaviorSubjectValue = this.authenticationService.getAuthResponseBSubVal();
    if(behaviorSubjectValue?.user){
      console.log("TRUE")
      return true;
    }else {
      console.log("FALSE")
      this.router.navigate(['/login/payment'],{
        queryParams: {
          accessDenied: true
        }
      });
      return false;
    }
  }
}
