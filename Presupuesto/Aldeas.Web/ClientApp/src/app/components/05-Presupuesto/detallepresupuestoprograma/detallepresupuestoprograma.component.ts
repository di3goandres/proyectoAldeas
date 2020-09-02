import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePresupuestoResponse, Detalle } from 'src/app/models/presupuesto/detalle.presupuesto.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detallepresupuestoprograma',
  templateUrl: './detallepresupuestoprograma.component.html',
  styleUrls: ['./detallepresupuestoprograma.component.css']
})
export class DetallepresupuestoprogramaComponent implements OnInit {
  @Input() detalle: Detalle[] = []
  dataSource: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'id', 'centroCosto',
  'subCentroCosto', 'nombreRubro', 'numeroIdentificacion', 'nombre', 'asignacion', 'cargo',
'nombreCuenta', 'cuentaSIIGO', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
'Octubre', 'Noviembre', 'Diciembre'];
  constructor() { }

  ngOnInit(): void {
    this.detalle = this.detalle.filter(item=>{
      return item.esNomina === true;
    })
  
    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

}
