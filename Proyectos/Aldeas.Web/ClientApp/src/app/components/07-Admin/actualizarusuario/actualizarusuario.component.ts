import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuarios } from 'src/app/models/usuarios/Usuarios';
import { UserService } from 'src/app/services/user.service';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';

@Component({
  selector: 'app-actualizarusuario',
  templateUrl: './actualizarusuario.component.html',
  styleUrls: ['./actualizarusuario.component.css']
})
export class ActualizarusuarioComponent implements OnInit {
  @Input() usuarioInput: Usuarios
  @Input() countAdmin: number;

 
 
  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;


  usuario: Usuarios

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private service: UserService,
    private activeModal: NgbActiveModal,

  ) { }


  Cerrar(){
    this.activeModal.dismiss();
  }
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

  
   
    var y: number = +this.activo ;
    this.usuario.idPerfil = y
  

    this.service.ActualizarUsuario(this.usuario).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200 && OK.status == "OK") {
          this.formgroup.reset();
          this.activeModal.close("OK")
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

    this.usuario = new Usuarios();
    this.usuario.id = this.usuarioInput.id;
    this.usuario.username = this.usuarioInput.username;

    this.activo= this.usuarioInput.idPerfil.toString();

    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.nullValidator],


    })
  }


}
