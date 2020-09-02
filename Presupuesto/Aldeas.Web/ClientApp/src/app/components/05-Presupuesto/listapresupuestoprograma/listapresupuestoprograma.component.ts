import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { PresupuestoListRequest, ProgramaL, PresupuestoL } from '../../../models/presupuesto/list.presupuesto.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-listapresupuestoprograma',
  templateUrl: './listapresupuestoprograma.component.html',
  styleUrls: ['./listapresupuestoprograma.component.css']
})
export class ListapresupuestoprogramaComponent implements OnInit {
  programaRequest = new PresupuestoListRequest()
  programa: ProgramaL;
  presupuesto: PresupuestoL[];
  dataSource: MatTableDataSource<PresupuestoL>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'id', 'anio',
  'coberturaAnual', 'coberturaMensual', 'coberturaMensualEsperada', 'coberturasCasas', 'Ver'];
  constructor(
    private route: ActivatedRoute,
    private service: PresupuestoService
  ) { }

  ngOnInit(): void {

    var y: number = +this.route.snapshot.paramMap.get('id');
    this.programaRequest.idPresupuesto = y
    this.cargaInicial();
  }

  cargaInicial() {
    this.service.getPresupuestoByProgram(this.programaRequest).subscribe(
      OK => { 
      this.programa = OK.programa;
      this.presupuesto = []
      this.presupuesto = OK.presupuesto;  
      this.dataSource = new MatTableDataSource(this.presupuesto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      
      },
      Error => { console.log(Error) },

    )
  }
}
