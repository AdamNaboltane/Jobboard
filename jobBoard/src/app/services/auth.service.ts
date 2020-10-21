import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JobBoard@JWT_TOKEN';
  userInfos: User = new User();
  jwtToken: string = null;
  isAuthenticated = false;
  isAdmin = false;

  constructor(private user: UserService, private snackBar: MatSnackBar) {
    this.jwtToken = localStorage.getItem(this.JWT_TOKEN);
    if (!!this.jwtToken) {
      this.isAuthenticated = true;
      const infos = AuthService.parseJwt(this.jwtToken);
      this.userInfos.email = infos.user;
      this.userInfos.id = infos.id;
      this.userInfos.access = infos.access;
      this.isAdmin = infos.access === 2;
      localStorage.setItem(this.JWT_TOKEN, this.jwtToken);
    }
  }

  private static parseJwt(token): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      return undefined;
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.user
      .login({
        email,
        password,
      })
      .pipe(
        tap((v) => {
          this.isAuthenticated = true;
          this.jwtToken = v.token;
          localStorage.setItem(this.JWT_TOKEN, this.jwtToken);
          const infos = AuthService.parseJwt(this.jwtToken);
          this.userInfos.email = infos.user;
          this.userInfos.id = infos.id;
          this.userInfos.access = infos.access;
          this.isAdmin = infos.access === 2;
        }),
        map((v) => !!v)
      );
  }

  logout(): void {
    this.userInfos = new User();
    this.jwtToken = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    localStorage.removeItem(this.JWT_TOKEN);
  }

  register(user: User, password): Observable<boolean> {
    return this.user
      .register({
        email: user.email,
        password,
        f_name: user.f_name,
        l_name: user.l_name,
        phone: user.phone,
      })
      .pipe(map((v) => !!v));
  }
}
