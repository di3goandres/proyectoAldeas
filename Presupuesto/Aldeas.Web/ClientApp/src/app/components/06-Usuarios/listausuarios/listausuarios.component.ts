import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from '../../../models/usuarios/usuarios.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { element } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VerprogramasasociadosComponent } from '../verprogramasasociados/verprogramasasociados.component';
import { AsociarprogramasComponent } from '../asociarprogramas/asociarprogramas.component';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {


  usuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'usuario',
    'administrador', 'asociar', 'Ver'];
  constructor(
    private service: UsuarioService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.cargaInicial()
  }
  OpenAsociar(element: Usuario) {
    const modalRef = this.modalService.open(AsociarprogramasComponent, { size: 'lg' });
    modalRef.componentInstance.idUsuario = element.id;
    modalRef.result.then((result) => {

    }, (reason) => {


    });
  }
  OpenProgramas(element: Usuario) {
    const modalRef = this.modalService.open(VerprogramasasociadosComponent, { size: 'lg' });
    modalRef.componentInstance.idUsuario = element.id;
    modalRef.result.then((result) => {

    }, (reason) => {


    });
  }
  cargaInicial() {
    this.service.getListUsuarios().subscribe(
      OK => {
        this.usuarios = []
        if (OK.usuarios != null)
          this.usuarios = OK.usuarios;

        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      Error => { console.log(Error) },

    )
  }

}
