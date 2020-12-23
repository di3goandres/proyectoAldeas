import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, DoCheck    {

  Editar =false;
  currentUser: User;
  userType: string = '';
  title = 'Aldeas Infantiles SOS';
  constructor(
    public userService: UserService,
    private router: Router


  ) {
   this.userService.currentUser.subscribe(x=> this.currentUser = x);
  }
  ngDoCheck(): void {
   
  }



  
  ngOnInit(): void {
    if(this.currentUser!= null){
      this.userType = this.currentUser.perfil;
      if(this.userType === 'ADMINISTRADOR' || this.userType === 'EDITOR'){
        this.Editar = true;
      }

    }
   
  }

  logout(){
    this.userService.logut();
    this.router.navigate(['/login']);
  }
}
