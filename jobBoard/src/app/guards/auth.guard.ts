import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isAuthenticated) {
      if (route.routeConfig.path === 'login') {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    } else {
      if (this.auth.isAuthenticated && route.routeConfig.path === 'login') {
        this.router.navigate(['/profile']);
        return false;
      }
      if (route?.data?.needAdmin && this.auth.isAdmin === false) {
        return false;
      }
      return true;
    }
  }
}
