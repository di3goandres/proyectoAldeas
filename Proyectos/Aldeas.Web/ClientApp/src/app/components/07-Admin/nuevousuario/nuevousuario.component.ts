import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from 'src/app/models/usuarios/Usuarios';
import { UserService } from 'src/app/services/user.service';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {

  formgroup: FormGroup;
  activo: 0;
  NuevoNombre: string;
  usuario: Usuarios

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private service: UserService
  ) { }


  openExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  openNoExitoso(Titulo, Mensaje) {
    const modalRef = this.modalService.open(RegistroNoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.Titulo = Titulo;
    modalRef.componentInstance.mensaje = Mensaje
    modalRef.result.then((result) => {

    }, (reason) => {


    });
  }
  onGuardar() {

    this.usuario = new Usuarios();
    var x = "32";
    var y: number = +this.activo ;
    this.usuario.idPerfil = y
    this.usuario.username = this.NuevoNombre;

    this.service.guardarUsuario(this.usuario).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200 && OK.status == "OK") {
          this.formgroup.reset();
          this.openExitoso()
        } else {
         

          if (OK.message == "NO EXISTE") {
            this.openNoExitoso("ATENCIÓN","USUARIO, NO EXISTE")
          }


       

        }
      },
      Error => { 
        this.openNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")
        
        console.log(Error)
      
      },

    )
   

  }
  ngOnInit(): void {


    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],


    })
  }

}
