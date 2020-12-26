import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuarios/usuarios.response';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-actualizarusuario',
  templateUrl: './actualizarusuario.component.html',
  styleUrls: ['./actualizarusuario.component.css']
})
export class ActualizarusuarioComponent implements OnInit {

  formgroup: FormGroup;
  activo: string;
  @Input() usuarioInput: Usuario

  NuevoNombre: string;
  usuario: Usuario
  constructor(
    private service: UsuarioService,
    private activeModal: NgbActiveModal,


  ) { }


  Cerrar(){
    this.activeModal.dismiss();
  }
  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.id = this.usuarioInput.id;
    this.usuario.username = this.usuarioInput.username;

    this.activo = this.usuarioInput.idPerfil.toString();
  }

  onGuardar() {


    // this.usuario.administrador = this.activo == "true" ? true : false;
    var y: number = +this.activo;
    this.usuario.idPerfil = y

    this.service.ActualizarUsuario(this.usuario).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200 && OK.status == "OK") {
          this.service.Exitoso();
          this.activeModal.close("OK")
        } else {
          if (OK.message == "NO EXISTE") {
            this.service.NoExitoso("USUARIO", "NO EXISTE")
            this.activeModal.close("NOK")

          } else if (OK.id == 0) {
            this.service.NoExitoso("USUARIO", "PREVIAMENTE AGREGADO")
            this.activeModal.close("NOK")

          }

        }
      },
      Error => {
        console.log(Error)
        this.activeModal.close("NOK")
        this.service.NoExitoso("Ha ocurrido un error ", "Intentelo nuevamente")
      },

    )


  }

}
