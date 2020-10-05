import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
import { PresupuestoCobertura, ProgramaCobertura } from '../../../../models/presupuestoanio/consulta.anio.response';

@Component({
  selector: 'app-veritemspresupuestonio',
  templateUrl: './veritemspresupuestonio.component.html',
  styleUrls: ['./veritemspresupuestonio.component.css']
})
export class VeritemspresupuestonioComponent implements OnInit {

  idPresupuestoAnio: number
   presupuestoCoberturas : PresupuestoCobertura[] = [];
   programaCobertura: ProgramaCobertura;

   
  dataSource: MatTableDataSource<PresupuestoCobertura>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'programa',
    'financiador', 'anio', 'coberturaAnual','coberturaMensual', 'coberturaMensualEsperada', 'coberturasCasas',   'Ver'];
  constructor(


    private route: ActivatedRoute,
    private service: PresupuestoService,
 
  ) { }

  ngOnInit(): void {

    var y: number = +this.route.snapshot.paramMap.get('id');
    this.idPresupuestoAnio = y;
    this.carcaInicial() 

  }
  carcaInicial() {
    this.service.getFinanciadoresCobertura(this.idPresupuestoAnio).subscribe(
      OK => { 
        this.programaCobertura = OK.programa;
        this.presupuestoCoberturas = [];
        this.presupuestoCoberturas.push(...OK.presupuesto)
        
        this.dataSource = new MatTableDataSource(this.presupuestoCoberturas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

       },
      Error => { console.log(Error) },

    )
  }

}
