import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private static addToken(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        token,
      },
    });
  }

  constructor(
    private auth: AuthService,
    private router: Router // private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.jwtToken) {
      request = TokenInterceptor.addToken(request, this.auth.jwtToken);
    }
    return next.handle(request).pipe<any>(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          try {
            if (request.url.indexOf('/login') === -1) {
              this.router.navigate(['/logout']);
            }
            return throwError(err);
          } catch (e) {}
        }
        return throwError(err);
      })
    );
  }
}
