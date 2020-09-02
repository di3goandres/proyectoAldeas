import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Detalle } from 'src/app/models/presupuesto/detalle.presupuesto.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
'Octubre', 'Noviembre', 'Diciembre'];
  constructor() { }

  ngOnInit(): void {
    this.detalle = this.detalle.filter(item=>{
      return item.esPptp === false && item.esNomina == false;
    })

    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

}
