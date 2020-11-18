import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProyectoService } from '../../../services/proyectos/proyecto.service';
import { ItemsProyectoList } from '../../../models/proyectos/proyecto.list.response';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-verproyectos',
  templateUrl: './verproyectos.component.html',
  styleUrls: ['./verproyectos.component.css']
})
export class VerproyectosComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nombre','tipoFinanciacion', 'status', 'donante',
  'fecha_inicio', 'fecha_finalizacion','detalle']

  itemsProyectos: ItemsProyectoList[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<ItemsProyectoList>();
  constructor(
    private service: ProyectoService
  ) { }

  ngOnInit(): void {
    this.cargaInicial();
  }


  cargaInicial(){
    this.service.getProyectos().subscribe(
          OK => {

            this.itemsProyectos = [];
            this.itemsProyectos.push(...OK.itemsProyectos);
            this.dataSource = new MatTableDataSource(this.itemsProyectos);
            this.dataSource.paginator = this.paginator;
          },
          ERROR => {console.log(ERROR)},
        )

  }
}
