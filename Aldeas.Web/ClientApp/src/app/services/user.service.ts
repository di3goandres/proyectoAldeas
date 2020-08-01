import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ConsultaDepartamentos } from '../models/ConsultaDepartamentos';
import { Proyecto } from '../models/proyect';


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

  public get currenUserValue(): User {
    return this.currentUserSubject.value;
  }


  ///metodo par ejecutar metodos get
  private ejecutarQuery<T>(query: string) {
    this.header = new HttpHeaders().set('Authorization', this.token);
    return this.http.get<T>(query, { headers: this.header });
  }


  // tslint:disable-next-line: typedef con autorizacion
  private ejecutarQueryPost(query: string, params: string) {
    this.header = new HttpHeaders().set('Authorization', this.token)
      .set('Content-Type', 'application/json');
    return this.http.post(query, params, { headers: this.header });

  }

  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/json');



    return this.http.post<any>('/api/user/authenticate', this.json, { headers: this.header })
      .pipe(map(user => {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;

      }))
      ;
  }

  logut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  getDepartamentos() {
    return this.http.get<ConsultaDepartamentos>('/assets/data/departamentos.json');
  }

  getDepartamentosRespando() {
    return this.ejecutarQuery<ConsultaDepartamentos>('/api/aldeas/datoscolombia/');
  }


  guardarRegistroProyecto(infoproyecto: Proyecto) {
    this.json = JSON.stringify(infoproyecto);
    this.params = '' + this.json;
    return this.ejecutarQueryPost('/api/aldeas/guardarproyecto', this.params);

  }

  getIdentity() {
    let token = localStorage.getItem('currentUser');
    // tslint:disable-next-line: triple-equals
    if (token && (token != 'undefined' || token != null)) {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;

  }
  validaToken(): Promise<boolean> {

    if (this.getIdentity() == null) {

      this.router.navigate(['login']);

      Promise.resolve(false);
    }
    return new Promise(resolve => {

      if (this.getIdentity() == null) {
        this.router.navigate(['login']);
        resolve(false);
      } else {
        resolve(true);
      }
    })
  }
}
