import { Component, OnInit, ViewChild } from '@angular/core';
import { Puc } from 'src/app/models/categorias/categoria.response';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Categoria } from '../../../models/categorias/categoria.response';
import { CategoriasService } from '../../../services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { ActualizarpucsComponent } from '../actualizarpucs/actualizarpucs.component';
import { CrearcategoriaComponent } from '../crearcategoria/crearcategoria.component';
import { AgregarpucarubroComponent } from '../agregarpucarubro/agregarpucarubro.component';

@Component({
  selector: 'app-listarubrospucs',
  templateUrl: './listarubrospucs.component.html',
  styleUrls: ['./listarubrospucs.component.css']
})
export class ListarubrospucsComponent implements OnInit {
  idCategoria: number;
  categoriaSeleccionada: Categoria;
  @ViewChild('pucs') table: MatTable<any>;
  displayedColumns: string[] = ['tipo', 'cuentaSIIGO',
    'descripcionCuenta', 'cuentaNAV', 'detalleCuentaNav', 'tipoCuentaNav', 'fichaBanco',
    'casa', 'requiereNotaIngles', 'estado', 'fechaActualizacion',
    'Actualizar'];
  dataSource: MatTableDataSource<Puc>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pucs: Puc[] = [];
  categorias: Categoria[] = [];

  constructor(
    private serviceCategoria: CategoriasService,
    private modalService: NgbModal) {

  }

  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

  openActualizar(element) {
    const modalRef = this.modalService.open(ActualizarpucsComponent, { size: 'lg' });
    modalRef.componentInstance.pucsInput = element;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial(true)
        this.table.renderRows()
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  openAgregar() {
    const modalRef = this.modalService.open(AgregarpucarubroComponent, { size: 'lg' });
    modalRef.componentInstance.categoria = this.categoriaSeleccionada;
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial(true)
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  openCrear() {

    const modalRef = this.modalService.open(CrearcategoriaComponent, { size: 'xl' });

    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial(true)
      }
      console.log('result', result);
    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }
  onChange(value) {
    this.idCategoria = value;
    let nuevos = this.pucs.filter(item => {
      return item.idCategoria == value;
    })
    this.categoriaSeleccionada = this.categorias.find(item => {
      return item.id == value;
    });
    this.dataSource = new MatTableDataSource(nuevos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    // this.table.renderRows()

  }

  cargaInicial(dato) {
    this.serviceCategoria.getCategoriasPucs().subscribe(
      OK => {
        console.log(OK)
        this.categorias = [];
        this.categorias.push(...OK.categorias)
        this.pucs = [];

        this.pucs.push(...OK.pucs)
        if (dato) {
          this.onChange(this.idCategoria)

          this.table.renderRows()

        }


      },
      Errr => { console.log(Errr) }

    )
  }
  ngOnInit(): void {
    this.idCategoria = 0;
    this.cargaInicial(false);


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
