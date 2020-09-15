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


  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  openNoExitoso(message) {
    const modalRef = this.modalService.open(NoexitosoComponent, { size: 'md' });
    modalRef.componentInstance.message = message;
    modalRef.result.then((result) => {

    }, (reason) => {


    });
  }
  onGuardar() {

    this.usuario = new Usuario();
    this.usuario.administrador = this.activo == "true" ? true : false;
    this.usuario.username = this.NuevoNombre;

    this.service.guardarUsuario(this.usuario).subscribe(
      OK => {
        console.log(OK)

        if (OK.code == 200 && OK.status == "OK") {
          this.formgroup.reset();
          this.openExitoso()
        } else {
          if (OK.message == "NO EXISTE") {
            this.openNoExitoso("USUARIO, NO EXISTE")


          } else if (OK.id == 0)
            this.openNoExitoso("USUARIO, PREVIAMENTE AGREGADO")

        }
      },
      Error => { console.log(Error) },

    )
    // this.categoriaActualizar = new Categoria();
    // this.categoriaActualizar.id =  this.categoria.id

    // this.categoriaActualizar.nombre = this.NuevoNombre;
    // this.categoriaActualizar.estado =  this.activo === "true"? true:false;

    // console.log( this.categoriaActualizar);
    // this.categoriaService.updateCategoria(this.categoriaActualizar)
    // .subscribe(

    //   OK => {
    //     if (OK.code == 200 && OK.status == "OK") {
    //       this.activeModal.close('OK')
    //     }
    //     console.log(OK)
    //   },
    //   ERROR => { console.log(ERROR) }
    // );

  }
  ngOnInit(): void {


    this.formgroup = this._formBuilder.group({

      nombre: ['', Validators.required],


    })
  }

}
