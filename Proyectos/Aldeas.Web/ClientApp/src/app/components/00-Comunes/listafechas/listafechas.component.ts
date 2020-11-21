import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsFecha } from 'src/app/models/proyectos/proyecto.unico.response';

@Component({
  selector: 'app-listafechas',
  templateUrl: './listafechas.component.html',
  styleUrls: ['./listafechas.component.css']
})
export class ListafechasComponent implements OnInit {

  @Input() fechas : ItemsFecha [];
  @Input() filtro : string;


  displayedColumns: string[] = ['position', 'fecha','tipo_fecha']

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ItemsFecha>();
  constructor() { }

  ngOnInit(): void {

  
  
    this.dataSource = new MatTableDataSource(this.fechas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

}
