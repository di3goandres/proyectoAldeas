import { Component, OnInit } from '@angular/core';
import { Login } from '../../../models/login';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login;
  title: string;
  error = '';
  errorBolean:boolean = false;
  loading= false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.user = new Login('', '');
    this.title = "BASE DE DATOS PROYECTOS ALDEAS INFANTILES SOS COLOMBIA";
    //Si tiene el token lo redirigimos al home// pantalla tres botone

  }

  ngOnInit(): void {
    this.logOut()
    if( this.userService.currenUserValue){
      this.router.navigate(['/Home']);
     }

  }

  onLogin(formulario): void {
    this.loading = true;
    this.errorBolean = false;
    this.userService.loginUser(this.user)
      // .pipe(first())
      .subscribe(
        data=>{
          // this.router.navigate(['/Home'])
          window.location.reload();
        },
        error =>{
          this.errorBolean = true;

          this.error = error,
          this.loading = false;
        }
      )

    

  }


  logOut(): void {
    console.log('Entre');
    this.route.params.subscribe(
      params => {
        let logout = +params.sure;
    console.log('Entre', logout);

        if (logout === 1) {
         this.userService.logut();
          // redireccion a la pagina principal.
          this.router.navigate(['login']);

        }

      }
    );
  }

}
