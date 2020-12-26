import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './models/user';
import {Location} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, DoCheck {
  Editar =false;

  mostrarItemsAdministrador: boolean;
  currentUser: User;
  userType: string = '';

  title = 'Aldeas Infantiles SOS';
  constructor(
    public userService: UserService,
    private router: Router,
    private _location: Location


  ) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngDoCheck(): void {
    if (this.userService.currenUserValue != null)
    this.mostrarItemsAdministrador = this.userService.currenUserValue.administrador

  }
  ngOnInit(): void {
  
    if(this.currentUser!= null){
      this.userType = this.currentUser.perfil;
      if(this.userType === 'ADMINISTRADOR' || this.userType === 'EDITOR'){
        this.Editar = true;
      }

    }
  }

  logout() {
    this.userService.logut();
    this.router.navigate(['/login']);
  }
  backClicked() {
    this._location.back();
  }
}
