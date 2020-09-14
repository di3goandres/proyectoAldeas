import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ConsultaDepartamentos } from '../models/ConsultaDepartamentos';
import { Proyecto } from '../models/proyect';
import { CentrosResponse, Respuesta } from '../models/comunes';

import { Colaborador } from '../models/colaborador';
import { RegistroParticipante } from '../models/DatosPartipante';
import { environment } from '../../environments/environment';


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

  postFile(fileToUpload: File, id: string) {
   
   let user = this.currentUserSubject.value;

    const formData: FormData = new FormData();
    this.header = new HttpHeaders().set('Authorization', user.token);

    formData.append('file', fileToUpload);
    formData.append('Proyecto', id.toString());
   
    return this.http.post<Respuesta>(environment.ApiUrl + '/api/aldeas/GuardarProyectoArchivo/',
     formData, { headers: this.header });
    
}

  ///metodo par ejecutar metodos get
  public ejecutarQuery<T>(query: string) {
   let user = this.currentUserSubject.value;
    this.header = new HttpHeaders().set('Authorization', user.token);
    return this.http.get<T>(environment.ApiUrl + query, { headers: this.header });
  }


  // tslint:disable-next-line: typedef con autorizacion
  public ejecutarQueryPost<T>(query: string, params: string) {
   let user = this.currentUserSubject.value;

    this.header = new HttpHeaders().set('Authorization', user.token)
      .set('Content-Type', 'application/json');
    return this.http.post<T>(environment.ApiUrl + query, params, { headers: this.header });

  }

  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    this.header = new HttpHeaders().set('Content-Type', 'application/json');



    return this.http.post<any>(environment.ApiUrl +'/api/user/authenticate', this.json, { headers: this.header })
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

  // getDepartamentos() {
  //   return this.http.get<ConsultaDepartamentos>('/assets/data/departamentos.json');
  // }

  getDepartamentos() {
    return this.ejecutarQuery<ConsultaDepartamentos>('/api/aldeas/datoscolombia/');
  }

  getProyectos() {
    return this.ejecutarQuery<ProyectoResponse>('/api/aldeas/datosproyectos');
  }


  getCentrosResponse() {
    return this.ejecutarQuery<CentrosResponse>('/api/aldeas/datoscentrocostos/');
  }


  guardarRegistroProyecto(infoproyecto: Proyecto) {
    this.json = JSON.stringify(infoproyecto);
    this.params = '' + this.json;
    return this.ejecutarQueryPost<Respuesta>('/api/aldeas/guardarproyecto', this.params);

  }

  guardarRegistroParticipantes(info: RegistroParticipante) {
    this.json = JSON.stringify(info);
    this.params = '' + this.json;
    return this.ejecutarQueryPost<Respuesta>('/api/aldeas/GuardarRegistroParticipantes/', this.params);

  }


  guardarColaborador(infoColaborador: Colaborador) {
    this.json = JSON.stringify(infoColaborador);
    this.params = '' + this.json;
    return this.ejecutarQueryPost<Respuesta>('/api/aldeas/GuardarColaborador', this.params);

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
