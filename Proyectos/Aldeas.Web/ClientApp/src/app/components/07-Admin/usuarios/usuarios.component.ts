import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService } from 'src/app/services/proyectos/proyecto.service';
import { Usuarios } from '../../../models/usuarios/Usuarios';
import { RegistroExitosoComponent } from '../../00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../../00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { ActualizarusuarioComponent } from '../actualizarusuario/actualizarusuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'usuario', 'perfil'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Usuarios>();
  ItemsUsarios: Usuarios[] = [];
  constructor(
    public service: ProyectoService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {

    let admin = this.service.permitirEditar();
    if (admin) {
      this.displayedColumns.push('actualizar');
      this.displayedColumns.push('Eliminar');

    }
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.service.ObtenerUsuarios().subscribe(
      OK => {
        console.log(OK)

        this.ItemsUsarios = [];
        this.ItemsUsarios.push(...OK.itemsUsarios);

        console.log(this.ItemsUsarios)
        this.dataSource = new MatTableDataSource(this.ItemsUsarios);
        this.dataSource.paginator = this.paginator;
        // this.dataSource.filter = this.filtro.trim().toLowerCase();
      },
      ERROR => { console.log(ERROR) },
    )
  }
  AbrirEditar(element: Usuarios) {

    let permitirBorrar = true;
    if (element.perfil == 'ADMINISTRADOR') {
      let admin = this.ItemsUsarios.filter(item => {
        return item.perfil == 'ADMINISTRADOR'
      })

      if (admin.length == 1) {
        permitirBorrar = false;
      }
    }


    if (permitirBorrar) {
      const modalRef = this.modalService.open(ActualizarusuarioComponent, { size: 'md' });
      modalRef.componentInstance.usuarioInput = element;
      
      modalRef.result.then((result) => {
  
        if(result=="OK"){
          this.cargarUsuarios();
        }
      }, (reason) => {
  
        if (reason === 'OK') {
  
  
        }
      });
    }else{
      this.registroNoExitoso("Atención", "No se puede Actualizar este administrador, ya que solo queda uno.")

    }

    
  }

  Eliminar(element: Usuarios) {
    let permitirBorrar = true;
    if (element.perfil == 'ADMINISTRADOR') {
      let admin = this.ItemsUsarios.filter(item => {
        return item.perfil == 'ADMINISTRADOR'
      })

      if (admin.length == 1) {
        permitirBorrar = false;
      }
    }


    if (permitirBorrar) {
      this.service.EliminarUsuario(element).subscribe(
        OK => { 
          this.registroExitoso();
          this.cargarUsuarios();
         },
        ERROR => { console.log(ERROR) 
          this.registroNoExitoso("Error", "Ha ocurrido un error inesperado, por favor intentelo nuevamente.")
        
        },
      )
    }else{
        this.registroNoExitoso("Atención", "No se puede borrar este administrador, ya que solo queda uno.")
    }


  }
  registroExitoso() {
    const modalRef = this.modalService.open(RegistroExitosoComponent, { size: 'md' });

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
