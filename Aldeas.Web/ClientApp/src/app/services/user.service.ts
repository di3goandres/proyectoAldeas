import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public params: string;
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  public token;
  public json: string;

  public header = new HttpHeaders({
    // tslint:disable-next-line: object-literal-key-quotes
    'Autorization': this.token
  });

  constructor(
      private http: HttpClient,
      public router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currenUserValue() : User {
     return this.currentUserSubject.value;
   }

  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/json');



    return this.http.post<any>('/api/user/authenticate', this.json,{ headers: this.header })
      .pipe(map(user => {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
        
      }))
    ;
  }

  logut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }


  getIdentity(){
    let token = localStorage.getItem('currentUser');
      // tslint:disable-next-line: triple-equals
      if (token && (token != 'undefined' || token != null)) {
        this.token = token;
      } else {
        this.token = null;
      }
      return this.token;

  }
  validaToken() : Promise<boolean> {

    if(this.getIdentity()==null){
  
      this.router.navigate(['login']);
     
      Promise.resolve(false);
    }
    return new Promise(resolve=>{

      if(this.getIdentity()==null){
        this.router.navigate(['login']);
        resolve(false);
      }else{
        resolve(true);
      }
    })
  }
}
