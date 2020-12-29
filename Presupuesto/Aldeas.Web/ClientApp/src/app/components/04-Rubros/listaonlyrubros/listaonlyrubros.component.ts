import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Categoria } from '../../../models/categorias/categoria.response';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';
import { ActualizarcategoriaComponent } from '../actualizarcategoria/actualizarcategoria.component';

@Component({
  selector: 'app-listaonlyrubros',
  templateUrl: './listaonlyrubros.component.html',
  styleUrls: ['./listaonlyrubros.component.css']
})
export class ListaonlyrubrosComponent implements OnInit {

  constructor(
    public categoriasService: CategoriasService,
    private modalService: NgbModal) { }
  displayedColumns: string[] = ['id', 'nombre',
    'fechaCreacion', 'fechaActualizacion', 'estado'];
  dataSource: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  categorias: Categoria[] = [];

  ngOnInit(): void {
    let value = this.categoriasService.permitirEditar();

    if (value){
      this.displayedColumns.push( 'Actualizar')
    }
    this.cargaInicial()
  }



  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

  openActualizar(element) {
    const modalRef = this.modalService.open(ActualizarcategoriaComponent, { size: 'md' });
    modalRef.componentInstance.categoria = element
    modalRef.result.then((result) => {
      if (result === "OK") {
        this.openExitoso();
        this.cargaInicial()
      }

    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  openCrear() {

    // const modalRef = this.modalService.open(CrearprogramaComponent, { size: 'lg' });
    // modalRef.componentInstance.Actuales = this.cecos
    // modalRef.result.then((result) => {
    //   if (result === "OK") {
    //     this.openExitoso();
    //     this.cargaInicial()
    //   }
    //   console.log('result', result);
    // }, (reason) => {

    //   if (reason === 'OK') {


    //   }
    // });
  }

  cargaInicial() {

   

    this.categoriasService.getCategorias().subscribe(
      OK => {
        this.categorias = [];
        this.categorias.push(...OK.categorias)

        this.dataSource = new MatTableDataSource(this.categorias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      Errr => { console.log(Errr) }

    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
