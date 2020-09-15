import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Programa } from 'src/app/models/programas/programas.response';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioProgramaEnvioRequest, UsuarioProgramaRequest } from '../../../models/usuarios/usuario.programa.request';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-asociarprogramas',
  templateUrl: './asociarprogramas.component.html',
  styleUrls: ['./asociarprogramas.component.css']
})
export class AsociarprogramasComponent implements OnInit {

  item: UsuarioProgramaEnvioRequest = new UsuarioProgramaEnvioRequest();;
  guardar: UsuarioProgramaRequest[] = []
  @Input() idUsuario: number;
  displayedColumns: string[] = ['id', 'nombre',
    'asociar'];
  dataSource: MatTableDataSource<Programa>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  programas: Programa[] = [];


  constructor(
    private service: UsuarioService,
    private modalService: NgbModal,

    private activeModal: NgbActiveModal) {

  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

  asociarTodos() {

  }
  asociar(element: Programa) {

    let nuevo = new UsuarioProgramaRequest();
    nuevo.Usuario = this.idUsuario
    nuevo.Programa = element.id

    this.guardar = [];
    this.item.AgregarPrograma = []
    this.guardar.push(nuevo);

    this.item.AgregarPrograma.push(...this.guardar);

    
    this.service.asociarPrograma(this.guardar).subscribe(
      OK => {
        this.openExitoso();
        this.cargaInicial();
      },
      Errr => { console.log(Errr) }

    )
  }


  cargaInicial() {
    this.service.gerProgramas(this.idUsuario).subscribe(
      OK => {

        this.programas = [];
        this.programas.push(...OK.programas)

        this.dataSource = new MatTableDataSource(this.programas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      Errr => { console.log(Errr) }

    )
  }
  ngOnInit(): void {
    this.cargaInicial();


  }



  close() {
    this.activeModal.close("OK")
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
