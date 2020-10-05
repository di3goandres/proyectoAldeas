import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PresupuestoService } from '../../../../services/presupuesto.service';
import { FinanciadoresDatum } from '../../../../models/financiadores/financiadores.response';

@Component({
  selector: 'app-financiadorfaltante',
  templateUrl: './financiadorfaltante.component.html',
  styleUrls: ['./financiadorfaltante.component.css']
})
export class FinanciadorfaltanteComponent implements OnInit {

  @Input() idPresupuestoAnio: number
  constructor(private service: PresupuestoService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.cargaInicial()
  }

 async cargaInicial() {
   await this.service.getFinanciadoresFaltantes(this.idPresupuestoAnio).subscribe(
      OK => { console.log(OK)
        this.datasourceFaltantes = [];
        this.datasourceFaltantes.push(...OK.financiadoresData);
        this.show = true;
        this.dataSource = new MatTableDataSource(this.datasourceFaltantes);
        this.dataSource.paginator = this.paginator;
      
      },
      Error => { console.log(Error) },

    )
  }


  datasourceFaltantes: FinanciadoresDatum[] = [];

  pedidoMinimo: number;
  show: boolean;
  urlPeticion: string;
  displayedColumns: string[] = ['position', 'nombreFinanciador', 'seleccionar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<FinanciadoresDatum>();
  selectedValue: number;




  Cerrar(){
    this.activeModal.dismiss("Nothing")
  }
  seleccionar(element: FinanciadoresDatum ){
    this.activeModal.close(element)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
