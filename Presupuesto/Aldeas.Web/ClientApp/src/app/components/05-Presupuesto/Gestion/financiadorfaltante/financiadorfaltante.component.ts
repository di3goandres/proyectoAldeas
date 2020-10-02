import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanciadoresCecoFaltante } from 'src/app/models/financiadores/financiadorFaltante.response';
import { PresupuestoService } from '../../../../services/presupuesto.service';

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
        this.datasourceFaltantes.push(...OK.cecos);
        this.show = true;
        this.dataSource = new MatTableDataSource(this.datasourceFaltantes);
        this.dataSource.paginator = this.paginator;
      
      },
      Error => { console.log(Error) },

    )
  }


  datasourceFaltantes: FinanciadoresCecoFaltante[] = [];

  pedidoMinimo: number;
  show: boolean;
  urlPeticion: string;
  displayedColumns: string[] = ['position', 'nombreFinanciador', 'codigoCeco',
    'nombre',
    'subCentro','nombreSubCentro', 'seleccionar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<FinanciadoresCecoFaltante>();
  selectedValue: number;




  Cerrar(){
    this.activeModal.dismiss("Nothing")
  }
  seleccionar(element: FinanciadoresCecoFaltante ){
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
