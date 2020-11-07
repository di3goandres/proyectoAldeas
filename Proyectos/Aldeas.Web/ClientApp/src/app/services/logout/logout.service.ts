import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  logout(){
   
    localStorage.removeItem('currentUser');
    // redireccion a la pagina principal.
    this.router.navigate(['login']);
  }

  openModal(){
    this.spinner.show();
  }
  cerrarModal(){
    this.spinner.hide();

  }
}
