import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Detalle } from 'src/app/models/presupuesto/detalle.presupuesto.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detalle-familiarpresupuestoprograma',
  templateUrl: './detalle-familiarpresupuestoprograma.component.html',
  styleUrls: ['./detalle-familiarpresupuestoprograma.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleFamiliarpresupuestoprogramaComponent implements OnInit {

  @Input() detalle: Detalle[] = []
  dataSource: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'centroCosto',
    'subCentroCosto', 'nombreRubro', 'noCasa', 'noKids',
    'nombreCuenta', 'cuentaSIIGO', 'Enero', 'Febrero',
    'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre', 'total',
    'detalleGasto', 'facility', 'cuentaCotable', 'notaIngles'];
  constructor() { }

  ngOnInit(): void {
    this.detalle = this.detalle.filter(item => {
      return item.esPptp === true;
    })

    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
