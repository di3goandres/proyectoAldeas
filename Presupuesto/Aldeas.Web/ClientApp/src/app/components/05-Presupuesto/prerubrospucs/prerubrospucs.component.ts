import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PresupuestoPuc } from '../../../models/presupuesto/data.presupuesto.response';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prerubrospucs',
  templateUrl: './prerubrospucs.component.html',
  styleUrls: ['./prerubrospucs.component.css']
})
export class PrerubrospucsComponent implements OnInit {
  @Input() rubrosPuc: PresupuestoPuc[] = []

  @ViewChild('pucs') table: MatTable<any>;
  displayedColumns: string[] = ['tipo', 'cuentaSIIGO',
    'descripcionCuenta', 'cuentaNAV', 'detalleCuentaNav', 'tipoCuentaNav',  'requiereNotaIngles', 'seleccionar'];
  dataSource: MatTableDataSource<PresupuestoPuc>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private activeModal: NgbActiveModal,

  ) { }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rubrosPuc);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  Seleccionar(element: PresupuestoPuc){
      this.activeModal.close(element)
  }
  cerrar(){
    this.activeModal.dismiss()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
