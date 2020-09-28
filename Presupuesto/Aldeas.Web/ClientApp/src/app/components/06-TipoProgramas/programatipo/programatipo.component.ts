import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoProgramaResponseData } from '../../../models/tipoprograma/TipoPrograma.response';
import { ProgramasService } from '../../../services/programas.service';

@Component({
  selector: 'app-programatipo',
  templateUrl: './programatipo.component.html',
  styleUrls: ['./programatipo.component.css']
})
export class ProgramatipoComponent implements OnInit {

  @ViewChild('pucs') table: MatTable<TipoProgramaResponseData>;

  idPrograma: number;
  displayedColumns: string[] = ['position', 'nombre',
    'cobertura', 'fechacreacion', 'fechaupdate'];
  dataSource: MatTableDataSource<TipoProgramaResponseData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tipoProgramas: TipoProgramaResponseData[] = []

  constructor(
    private servicePrograma: ProgramasService,
    private modalService: NgbModal) {

  }


  cargaInicial() {
    this.servicePrograma.getTipoProgramas().subscribe(
      OK => {

        this.tipoProgramas = [];
        this.tipoProgramas.push(...OK.data)
     

        this.dataSource = new MatTableDataSource( this.tipoProgramas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      Errr => { console.log(Errr) }

    )
  }
  ngOnInit(): void {

  
    this.cargaInicial();


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
