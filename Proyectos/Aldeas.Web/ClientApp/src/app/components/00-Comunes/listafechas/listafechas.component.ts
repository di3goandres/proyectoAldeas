import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsFecha } from 'src/app/models/proyectos/proyecto.unico.response';
import { EditarfechaComponent } from '../editarfecha/editarfecha.component';
import { RegistroExitosoComponent } from '../registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from '../registro-noexitoso/registro-noexitoso.component';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';

@Component({
  selector: 'app-listafechas',
  templateUrl: './listafechas.component.html',
  styleUrls: ['./listafechas.component.css']
})
export class ListafechasComponent implements OnInit {

  @Input() fechas : ItemsFecha [];
  @Input() filtro : string;
  @Output() valid = new EventEmitter<boolean>();


  displayedColumns: string[] = ['position', 'fecha','tipo_fecha']

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ItemsFecha>();
  constructor(
    private modalService: NgbModal,
    public service: ProyectoService,

  ) { }

  ngOnInit(): void {

    let value = this.service.permitirEditar();

    if (value){
      this.displayedColumns.push( 'actualizar')
    }
  
    this.dataSource = new MatTableDataSource(this.fechas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }


  AbrirEditar(element: ItemsFecha ) {
    const modalRef = this.modalService.open(EditarfechaComponent, { size: 'md' });
    modalRef.componentInstance.Fecha = element;
    
    modalRef.result.then((result) => {
    
   
      if(result=="OK"){
        this.registroExitoso();
        this.valid.emit(true);
      }else  if(result=="NOK"){
        this.registroNoExitoso("Ha ocurrido un error", "Intentelo mas tarde")

        this.valid.emit(false);
      }
    }, (reason) => {

      this.valid.emit(false);
    });
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
