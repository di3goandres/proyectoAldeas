import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Detalle } from 'src/app/models/presupuesto/detalle.presupuesto.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizardetalleComponent } from '../actualizardetalle/actualizardetalle.component';

@Component({
  selector: 'app-detalle-otrospresupuestoprograma',
  templateUrl: './detalle-otrospresupuestoprograma.component.html',
  styleUrls: ['./detalle-otrospresupuestoprograma.component.css']
})
export class DetalleOtrospresupuestoprogramaComponent implements OnInit {

  @Input() detalle: Detalle[] = []
  dataSource: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'id', 'centroCosto',
  'subCentroCosto', 'nombreRubro',
'nombreCuenta', 'cuentaSIIGO', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre' ,'total' ,'detalleGasto', 'facility', 'cuentaCotable', 'notaIngles', 'editar'];
  constructor(
    private service: PresupuestoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.detalle = this.detalle.filter(item=>{
      return item.esPptp === false && item.esNomina == false;
    })

    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  Actualizar(element) {
    const modalRef = this.modalService.open(ActualizardetalleComponent, { size: 'xl' });

    modalRef.componentInstance.entrada = element;
    modalRef.result.then((result) => {

      this.getDetalle(result)


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  getDetalle(id) {
    let number = id;
    this.detalle = []

    this.service.getDetallePresupuesto(number).subscribe(

      OK => {
        console.log(OK)
        this.detalle = []
        this.detalle.push(...OK.detallePresupuesto)
        this.detalle = this.detalle.filter(item=>{
          return item.esPptp === false && item.esNomina == false;
        })
        this.dataSource = new MatTableDataSource(this.detalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      Error => { console.log(Error) },

    )
  }
}
