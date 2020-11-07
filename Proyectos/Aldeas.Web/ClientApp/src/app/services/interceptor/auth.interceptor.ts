import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LogoutService } from '../logout/logout.service';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private Service: LogoutService,


  ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.Service.openModal();



    let user = this.currentUserSubject.value;
    let token = user.token

    if (token != null)
      request = this.addToken(request, token);
    return next.handle(request)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.Service.cerrarModal();
          }
        }),
        catchError(Error => {
          if (Error.status == 401) {
            this.Service.logout();
          }
          this.Service.cerrarModal();

          return throwError(Error)
        }));
  }
  private addToken(request: HttpRequest<any>, token: string) {
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return request.clone({
      headers,

    })

  }
}
