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

import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoexitosoComponent } from '../components/00-Comunes/noexitoso/noexitoso.component';
import { RegistroexitosoComponent } from '../components/00-Comunes/registroexitoso/registroexitoso.component';
import { RegistroNoexitosoComponent } from '../components/00-Comunes/registro-noexitoso/registro-noexitoso.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public params: string;
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  public token;
  public json: string;

  // public header = new HttpHeaders({
  //   // tslint:disable-next-line: object-literal-key-quotes
  //   'Autorization': this.token
  // });

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,

    public router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currenUserValue(): User {
    return this.currentUserSubject.value;
  }



  ///metodo par ejecutar metodos get
  public ejecutarQuery<T>(query: string) {
   let user = this.currentUserSubject.value;
    // this.header = new HttpHeaders().set('Authorization', user.token);
    // return this.http.get<T>(environment.ApiUrl + query, { headers: this.header });
    return this.http.get<T>(environment.ApiUrl + query);

  }

  public ejecutarQueryPostNuevo<T>(query: string, data: any) {

    let json = JSON.stringify(data);
    let params = json;

    return this.http.post<T>(environment.ApiUrl + query, params);


  }


  isAdmin(): Promise<boolean> {


    let user = this.currenUserValue;
    console.log(user)
    return new Promise(resolve => {

      if (user.perfil = 'ADMINISTRADOR') {
        resolve(true);
      } else {
        this.router.navigate(['home']);
  
        resolve(false);
  
      }
    })
   

  }
  // tslint:disable-next-line: typedef con autorizacion
  public ejecutarQueryPost<T>(query: string, params: string) {
   let user = this.currentUserSubject.value;

    // this.header = new HttpHeaders().set('Authorization', user.token)
    //   .set('Content-Type', 'application/json');
    return this.http.post<T>(environment.ApiUrl + query, params);
    // return this.http.post<T>(environment.ApiUrl + query, params, { headers: this.header });


  }

  loginUser(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.gettoken = 'true';
    }
    this.json = JSON.stringify(user);
    this.params = 'json=' + this.json;
    let header = new HttpHeaders().set('Content-Type', 'application/json');



    return this.http.post<any>(environment.ApiUrl +'/api/user/authenticate', this.json, { headers: header })
    // return this.http.post<any>(environment.ApiUrl +'/api/user/authenticate', this.json)

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

  getUrl(){
    return environment.ApiUrl ;
  }

  permitirEditar(){
    let user = this.currenUserValue;
    if(user.perfil === 'ADMINISTRADOR' || user.perfil === 'EDITOR'){
      return true;
    }else{
      return false;
    }
  }



  registroExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent, { size: 'md' });

    modalRef.result.then((result) => {
     
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  registroNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
}
