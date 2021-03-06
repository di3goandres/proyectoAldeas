import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Detalle } from 'src/app/models/presupuesto/detalle.presupuesto.response';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PresupuestoService } from '../../../services/presupuesto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizardetalleComponent } from '../actualizardetalle/actualizardetalle.component';
import { BorrardetallepresupuestoComponent } from '../borrardetallepresupuesto/borrardetallepresupuesto.component';
import { NoexitosoComponent } from '../../00-Comunes/noexitoso/noexitoso.component';
import { RegistroexitosoComponent } from '../../00-Comunes/registroexitoso/registroexitoso.component';

@Component({
  selector: 'app-detalle-familiarpresupuestoprograma',
  templateUrl: './detalle-familiarpresupuestoprograma.component.html',
  styleUrls: ['./detalle-familiarpresupuestoprograma.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleFamiliarpresupuestoprogramaComponent implements OnInit {
  @Output() elimine = new EventEmitter<boolean>();

  @Input() detalle: Detalle[] = []
  dataSource: MatTableDataSource<Detalle>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'centroCosto',
    'subCentroCosto', 'nombreRubro', 'noCasa', 'noKids',
    'nombreCuenta', 'cuentaSIIGO', 'Enero', 'Febrero',
    'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre', 'total',
    'detalleGasto', 'facility', 'cuentaCotable', 'notaIngles', 'editar', 'borrar'];
  constructor(
    private service: PresupuestoService,
    private modalService: NgbModal
  ) { }

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

  
  Actualizar(element) {
    const modalRef = this.modalService.open(ActualizardetalleComponent, { size: 'xl' });

    modalRef.componentInstance.entrada = element;
    modalRef.result.then((result) => {

      this.getDetalle(result)


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

  getDetalle(id) {
    let number = id;
    this.detalle = []

    this.service.getDetallePresupuesto(number).subscribe(

      OK => {
        console.log(OK)
        this.detalle = []
        this.detalle.push(...OK.detallePresupuesto)
        this.detalle = this.detalle.filter(item => {
          return item.esPptp === true;
        })
        this.dataSource = new MatTableDataSource(this.detalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort

      },
      Error => { console.log(Error) },

    )
  }
  openExitoso() {
    const modalRef = this.modalService.open(RegistroexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }

  openNoExitoso() {
    const modalRef = this.modalService.open(NoexitosoComponent,
      { size: 'md' });

    modalRef.result.then((result) => {


    }, (reason) => {


    });
  }
  async Borrar(element: Detalle) {
    const modalRef = this.modalService.open(BorrardetallepresupuestoComponent, { size: 'md' });

    modalRef.result.then((result) => {

      if (result == "BORRAR") {

        this.service.borrarDetallePresupuesto(element.id).subscribe(
          OK => {
            this.openExitoso()
            this.elimine.emit(true);
          },
          Error => { this.openNoExitoso() },

        )
      }


    }, (reason) => {

      if (reason === 'OK') {


      }
    });
  }

}
