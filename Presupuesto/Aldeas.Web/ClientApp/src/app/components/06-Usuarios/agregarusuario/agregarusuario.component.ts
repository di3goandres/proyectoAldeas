import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../models/usuarios/usuarios.response';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoexitosoComponent } from '../../00-Comunes/noexitoso/noexitoso.component';

@Component({
  selector: 'app-agregarusuario',
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent implements OnInit {


  formgroup: FormGroup;
  activo: string;
  NuevoNombre: string;
  usuario: Usuario

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private service: UsuarioService
  ) { }


 
  onGuardar() {

    this.usuario = new Usuario();
    // this.usuario.administrador = this.activo == "true" ? true : false;
    var y: number = +this.activo ;
    this.usuario.idPerfil = y
    

    this.usuario.username = this.NuevoNombre;

    this.service.guardarUsuario(this.usuario).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200 && OK.status == "OK") {
          this.formgroup.reset();
           this.service.Exitoso();
        } else {
          if (OK.message == "NO EXISTE") {
            this.service.NoExitoso("USUARIO", "NO EXISTE")


          } else if (OK.id == 0)
          this.service.NoExitoso("USUARIO", "PREVIAMENTE AGREGADO")

        }
      },
      Error => { console.log(Error)
      
        this.service.NoExitoso("Ha ocurrido un error ", "Intentelo nuevamente")
      },

    )
  

  }
  ngOnInit(): void {


    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],


    })
  }

}
